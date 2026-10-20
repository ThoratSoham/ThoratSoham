/* ==========================================================================
   3D CYLINDER POSTS CATALOGUE MODULE
   Directly implements Avi Vashishta's 3D Reel Ring Architecture:
   - Concept 1: A cylinder is just angles (slot * 360 / slots)
   - Concept 2: One pose function owns the animation (reelPose with deal swing)
   - Concept 3: The loader and hero are two ends of one interpolation (reelScene)
   - Concept 4: Two motion values (formation and expansion)
   - Concept 5: Write styles only when they change (dirty checking)
   - Concept 6: Drag, swipe, wheel, buttons & accessible fallback
   ========================================================================== */

import { t } from './i18n.js';

export const REEL_SLOTS = 18; // 18 slots = 2 × 9 videos for perfect balance
const DEAL = 0.3; // Share of formation each card spends moving

let postsData = [];
let currentCategory = 'all';
let viewMode = '3d'; // '3d' or 'track'

// Motion values & physics state
let formationVal = 0;
let expansionVal = 0;
let targetAngle = 0;
let visibleAngle = 0;

let isFormed = false;
let isExpanded = false;
let isDragging = false;
let startX = 0;
let lastAngle = 0;
let frameCount = 0;
let animationFrameId = null;

// DOM Style write cache (Concept 5: write styles only when they change)
const writtenStyles = new Map();

/**
 * Concept 1: A cylinder is just angles
 */
export function reelAngle(slot, angle, slots = REEL_SLOTS) {
  return ((slot * 360 / slots + angle + 180) % 360 + 360) % 360 - 180;
}

/**
 * Concept 2: One pose function owns the animation
 */
export function reelPose(angle, formation, scene) {
  const around = ((angle + 180) % 360 + 360) % 360;
  const order = around / 360;

  // Staggered slice of 0..1 formation
  const tProgress = Math.max(0, Math.min(1, (formation - order * (1 - DEAL)) / DEAL));
  const dealt = 1 - Math.pow(1 - tProgress, 3); // ease-out cubic
  const placed = -180 + around * dealt; // swing from front (-180) to cylinder angle

  const r = (placed * Math.PI) / 180;
  const radius = scene.radius - (1 - dealt) * order * 24; // stack reads as one card

  const x = -Math.sin(r) * radius;
  const z = -Math.cos(r) * radius;
  const yaw = placed;
  const appear = Math.min(1, tProgress * 2.5); // never show the waiting stack

  // Only mark behind camera if physically beyond the camera's front frustum plane
  const behindCamera = z > (scene.perspective || 750) * 0.98;

  return {
    x: Number(x.toFixed(2)),
    y: 0,
    z: Number(z.toFixed(2)),
    yaw: Number(yaw.toFixed(2)),
    scale: Number(scene.scale.toFixed(3)),
    appear: Number(appear.toFixed(3)),
    behindCamera
  };
}

/**
 * Concept 3: The loader and hero are two ends of one interpolation
 */
const START_SCENE = { radius: 460, perspective: 1000, tilt: -20, roll: -15, scale: 0.62 };
const END_SCENE = { radius: 980, perspective: 650, tilt: -6, roll: 0, scale: 1.0 };

export function reelScene(expansion) {
  const p = Math.max(0, Math.min(1, expansion));
  // Squared easing on scale for the swelling drop-in effect
  const scaleEase = p * p;

  return {
    radius: START_SCENE.radius + (END_SCENE.radius - START_SCENE.radius) * p,
    perspective: START_SCENE.perspective + (END_SCENE.perspective - START_SCENE.perspective) * p,
    tilt: START_SCENE.tilt * (1 - p) + END_SCENE.tilt * p,
    roll: START_SCENE.roll * (1 - p),
    scale: START_SCENE.scale + (END_SCENE.scale - START_SCENE.scale) * scaleEase,
    expansion: p
  };
}

/**
 * Main Initialization
 */
export async function initInstagram() {
  const stage = document.getElementById('posts-3d-stage');
  const filtersContainer = document.getElementById('studio-filters');
  const ring = document.getElementById('cylinder-ring');

  try {
    const res = await fetch('data/instagram.json');
    postsData = await res.json();
  } catch (err) {
    console.warn('Could not load instagram.json', err);
    return;
  }

  renderFilters(filtersContainer);
  build3DCylinderCards(ring);
  renderFlatTrack(document.getElementById('studio-grid'));
  setupInteractionHandlers();
  setupViewModeToggle();

  // Check reduced motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    formationVal = 1;
    expansionVal = 1;
    isFormed = true;
    isExpanded = true;
  } else {
    // Start entrance animation when stage enters viewport
    setupIntersectionEntrance(stage);
  }

  // Start continuous 60FPS render loop
  startRenderLoop();

  window.addEventListener('i18n:change', () => {
    renderFilters(filtersContainer);
    build3DCylinderCards(ring);
    renderFlatTrack(document.getElementById('studio-grid'));
  });
}

/**
 * View Mode Toggle (3D Cylinder vs Flat Track)
 */
function setupViewModeToggle() {
  const btn3D = document.getElementById('view-mode-3d');
  const btnTrack = document.getElementById('view-mode-track');
  const viewport3D = document.getElementById('cylinder-viewport');
  const controls3D = document.querySelector('.cylinder-controls');
  const trackWrap = document.getElementById('studio-track-wrap');

  if (!btn3D || !btnTrack) return;

  btn3D.addEventListener('click', () => {
    viewMode = '3d';
    btn3D.classList.add('active');
    btnTrack.classList.remove('active');
    if (viewport3D) viewport3D.style.display = 'flex';
    if (controls3D) controls3D.style.display = 'flex';
    if (trackWrap) trackWrap.style.display = 'none';
  });

  btnTrack.addEventListener('click', () => {
    viewMode = 'track';
    btnTrack.classList.add('active');
    btn3D.classList.remove('active');
    if (viewport3D) viewport3D.style.display = 'none';
    if (controls3D) controls3D.style.display = 'none';
    if (trackWrap) trackWrap.style.display = 'block';
  });
}

/**
 * Build 16 DOM cards on the inside of the 3D cylinder
 */
function build3DCylinderCards(ring) {
  if (!ring) return;
  ring.innerHTML = '';
  writtenStyles.clear();

  const filteredPosts = getFilteredPosts();
  if (filteredPosts.length === 0) return;

  for (let slot = 0; slot < REEL_SLOTS; slot++) {
    // Virtual recycling: map 16 slots to available posts
    const post = filteredPosts[slot % filteredPosts.length];
    const card = document.createElement('a');
    card.className = 'posts-3d-card';
    card.id = `cylinder-card-${slot}`;
    card.href = post.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.setAttribute('aria-label', `View ${post.title || 'Work'} on Instagram`);

    const title = post.title || `Work ${String(post.id).padStart(2, '0')}`;
    const category = post.category ? post.category.toUpperCase() : (post.type === 'reel' ? 'REEL' : 'POST');
    const year = post.year || '2026';

    card.innerHTML = `
      <div class="card-inner-media">
        <img src="${post.cover}" alt="" class="card-media-poster" loading="lazy" />
        ${post.video ? `
          <video src="${post.video}" muted loop playsinline preload="metadata" class="card-media-video"></video>
        ` : ''}
      </div>
      <div class="card-glass-badge">
        <span class="badge-tag">${category}</span>
        <span class="badge-year">${year}</span>
      </div>
      <div class="card-glass-footer">
        <h3 class="card-glass-title">${title}</h3>
        ${post.role ? `<p class="card-glass-role">${post.role}</p>` : ''}
        <span class="card-glass-link">View on Instagram ↗</span>
      </div>
    `;

    ring.appendChild(card);
  }
}

/**
 * Filter Chips
 */
function renderFilters(filtersContainer) {
  if (!filtersContainer) return;

  const categories = new Set(['all']);
  postsData.forEach(p => {
    if (p.category) categories.add(p.category.toLowerCase());
  });

  filtersContainer.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `filter-chip ${cat === currentCategory ? 'active' : ''}`;
    btn.textContent = cat === 'all' ? 'All Works' : cat.charAt(0).toUpperCase() + cat.slice(1);
    btn.addEventListener('click', () => {
      currentCategory = cat;
      document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      build3DCylinderCards(document.getElementById('cylinder-ring'));
      renderFlatTrack(document.getElementById('studio-grid'));
    });
    filtersContainer.appendChild(btn);
  });
}

function getFilteredPosts() {
  return currentCategory === 'all'
    ? postsData
    : postsData.filter(p => (p.category || '').toLowerCase() === currentCategory);
}

/**
 * Concept 5: Write styles only when they change
 */
function writeStyle(key, value, applyFn) {
  if (writtenStyles.get(key) === value) return;
  writtenStyles.set(key, value);
  applyFn();
}

/**
 * 60 FPS Render Loop with Spring Physics
 */
function startRenderLoop() {
  const ring = document.getElementById('cylinder-ring');
  const viewport = document.getElementById('cylinder-viewport');

  const render = () => {
    frameCount++;

    // Spring chase: visible angle follows target angle smoothly
    visibleAngle += (targetAngle - visibleAngle) * 0.085;

    // Ambient idle rotation when user is not dragging
    if (!isDragging && isExpanded && viewMode === '3d') {
      targetAngle += 0.08;
    }

    if (viewMode === '3d' && ring) {
      const scene = reelScene(expansionVal);

      // Write shared ring styles as CSS variables on ring element
      writeStyle('ring-perspective', `${scene.perspective.toFixed(1)}px`, () => {
        if (viewport) viewport.style.perspective = `${scene.perspective.toFixed(1)}px`;
      });
      writeStyle('ring-transform', `rotateX(${scene.tilt.toFixed(2)}deg) rotateZ(${scene.roll.toFixed(2)}deg) rotateY(${visibleAngle.toFixed(2)}deg)`, () => {
        ring.style.transform = `rotateX(${scene.tilt.toFixed(2)}deg) rotateZ(${scene.roll.toFixed(2)}deg) rotateY(${visibleAngle.toFixed(2)}deg)`;
      });

      // Update 16 cards
      for (let slot = 0; slot < REEL_SLOTS; slot++) {
        const card = document.getElementById(`cylinder-card-${slot}`);
        if (!card) continue;

        // Slot angle relative to camera
        const angle = reelAngle(slot, visibleAngle, REEL_SLOTS);
        const restingSlotAngle = (slot * 360) / REEL_SLOTS;

        // Calculate card pose
        const pose = reelPose(restingSlotAngle, formationVal, scene);

        // Transform string
        const transformStr = `translate3d(${pose.x}px, ${pose.y}px, ${pose.z}px) rotateY(${pose.yaw}deg) scale(${pose.scale})`;

        writeStyle(`card-${slot}-transform`, transformStr, () => {
          card.style.transform = transformStr;
        });

        writeStyle(`card-${slot}-opacity`, `${pose.appear}`, () => {
          card.style.opacity = pose.appear;
        });

        writeStyle(`card-${slot}-vis`, pose.behindCamera ? 'hidden' : 'visible', () => {
          card.style.visibility = pose.behindCamera ? 'hidden' : 'visible';
        });

        // Smart Video Playback: Play ONLY when within 65 degrees of camera
        const video = card.querySelector('video');
        if (video) {
          const isFacingCamera = Math.abs(angle) < 65 && expansionVal > 0.5 && !pose.behindCamera;
          if (isFacingCamera) {
            if (video.paused) video.play().catch(() => {});
          } else {
            if (!video.paused) video.pause();
          }
        }
      }
    }

    animationFrameId = requestAnimationFrame(render);
  };

  animationFrameId = requestAnimationFrame(render);
}

/**
 * Concept 4: Two motion values, no timeline
 * Animate formation (2.4s) then expansion (1.6s)
 */
function setupIntersectionEntrance(stage) {
  if (!stage) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isFormed) {
          observer.disconnect();
          startEntranceAnimation();
        }
      });
    },
    { threshold: 0.15 }
  );

  observer.observe(stage);
}

function startEntranceAnimation() {
  const startTime = performance.now();
  const formationDuration = 2400; // 2.4s linear deal
  const expansionDuration = 1600; // 1.6s expansion

  function step(now) {
    const elapsed = now - startTime;

    if (elapsed < formationDuration) {
      formationVal = Math.min(1, elapsed / formationDuration);
      requestAnimationFrame(step);
    } else {
      formationVal = 1;
      isFormed = true;

      // Expand into level 3D carousel
      const expStart = performance.now();
      function stepExpansion(expNow) {
        const expElapsed = expNow - expStart;
        const p = Math.min(1, expElapsed / expansionDuration);
        // Ease cubic-bezier(.5, 0, .15, 1)
        expansionVal = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

        if (p < 1) {
          requestAnimationFrame(stepExpansion);
        } else {
          expansionVal = 1;
          isExpanded = true;
        }
      }
      requestAnimationFrame(stepExpansion);
    }
  }

  requestAnimationFrame(step);
}

/**
 * Concept 6: Leave a way out (Drag, swipe, wheel & buttons)
 */
function setupInteractionHandlers() {
  const stage = document.getElementById('posts-3d-stage');
  const prevBtn = document.getElementById('cylinder-prev-btn');
  const nextBtn = document.getElementById('cylinder-next-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      targetAngle += 360 / REEL_SLOTS;
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      targetAngle -= 360 / REEL_SLOTS;
    });
  }

  if (!stage) return;

  // Pointer drag
  stage.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    lastAngle = targetAngle;
    stage.setPointerCapture(e.pointerId);
  });

  stage.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    targetAngle = lastAngle - deltaX * 0.22;
  });

  const stopDrag = (e) => {
    if (isDragging) {
      isDragging = false;
      try {
        stage.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }
  };

  stage.addEventListener('pointerup', stopDrag);
  stage.addEventListener('pointercancel', stopDrag);

  // Wheel listener
  stage.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY || e.deltaX;
    targetAngle += delta * 0.12;
  }, { passive: false });
}

/**
 * 2D Flat Track fallback rendering
 */
function renderFlatTrack(container) {
  if (!container) return;
  container.innerHTML = '';
  const filtered = getFilteredPosts();

  filtered.forEach((post) => {
    const card = document.createElement('article');
    card.className = 'instagram-card card';
    const titleText = post.title || `Work ${String(post.id).padStart(2, '0')}`;
    const typeLabel = post.type === 'reel' ? 'Reel' : 'Post';

    card.innerHTML = `
      <div class="card-media-wrap">
        <img src="${post.cover}" alt="${titleText}" class="card-cover-img" loading="lazy" />
        <span class="card-badge-type">${typeLabel}</span>
      </div>
      <div class="card-details">
        <div class="card-info">
          <div class="card-title-row">
            <h3 class="card-title">${titleText}</h3>
            ${post.year ? `<span class="card-year">${post.year}</span>` : ''}
          </div>
          ${post.role ? `<div class="card-meta">${post.role}</div>` : ''}
        </div>
        <div class="card-embed-actions">
          <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline card-ig-btn">
            View on Instagram ↗
          </a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}
