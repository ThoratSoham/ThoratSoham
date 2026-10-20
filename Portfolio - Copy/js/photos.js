/* ==========================================================================
   PHOTO PORTFOLIO: DEAL FAN WHEEL MODULE
   Implementation of Avi Vashishta's "The Deal Hero":
   A deck of vertical video/photo cards dealt into a fan, lifting into a turning wheel.
   ========================================================================== */

import {
  WHEEL_CARDS_COUNT,
  VISIBLE_ANGLE_CUTOFF,
  wrapAngle,
  cardDealProgress,
  liftGeometry,
  calculateCardPose
} from '../src/dealPose.js';

let photosData = [];
let cardsElements = [];
let writtenStyles = new Map();

// Motion & Physics State
let dealProgress = 0;       // 0 -> 1 (the deal / entrance)
let liftProgress = 0;       // 0 -> 1 (the lift / reveal into wide turning wheel)
let spinAngle = 0;          // Current visible rotation angle around pivot
let targetAngle = 0;        // Target angle eased towards
let velocity = 0;           // Flick velocity (degrees/sec)
let lastPointerTime = 0;
let isDragging = false;
let startX = 0;
let lastX = 0;
let dragDistance = 0;

let animationFrameId = null;
let lastTimestamp = 0;
let dealStartTime = 0;
let liftStartTime = 0;
let hasEntered = false;

// DOM references
let stageEl = null;
let wheelEl = null;
let skyEl = null;
let cloudsEl = null;
let modalEl = null;

/**
 * Initializes the Photo Portfolio Deal Wheel Section
 */
export async function initPhotoWheel() {
  const container = document.getElementById('photos-deal-stage');
  if (!container) return;

  stageEl = container.querySelector('.deal-wheel-stage');
  wheelEl = container.querySelector('.deal-wheel-cards');
  skyEl = container.querySelector('.deal-sky-bg');
  cloudsEl = container.querySelector('.deal-clouds-bank');
  modalEl = document.getElementById('photo-modal');

  try {
    const res = await fetch('data/photos.json');
    if (!res.ok) throw new Error('Failed to load photos.json');
    photosData = await res.json();
  } catch (err) {
    console.error('Photo portfolio load error:', err);
    return;
  }

  // Ensure we have exactly 34 cards (pad/slice if needed)
  while (photosData.length < WHEEL_CARDS_COUNT) {
    photosData.push(...photosData.slice(0, WHEEL_CARDS_COUNT - photosData.length));
  }
  photosData = photosData.slice(0, WHEEL_CARDS_COUNT);

  // Build Card DOM Elements
  buildCardsDOM();

  // Setup Controls & Gestures
  setupGestures();
  setupControls();
  setupLightbox();

  // Pre-decode all images
  preloadImages();

  // Trigger Deal when scrolled into view
  setupIntersectionObserver();
}

/**
 * Builds the 34 card elements with double faces (front: photo, back: luxury monogram)
 */
function buildCardsDOM() {
  if (!wheelEl) return;
  wheelEl.innerHTML = '';
  cardsElements = [];
  writtenStyles.clear();

  photosData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'deal-card';
    card.setAttribute('data-index', index);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${item.title} - ${item.category} (${item.year})`);

    card.innerHTML = `
      <div class="deal-card-inner">
        <!-- FRONT FACE: High-Res Photo & Visual Art -->
        <div class="deal-card-front">
          <img src="${item.image}" alt="${item.title}" loading="eager" class="deal-card-img" />
          <div class="deal-card-scrim"></div>
          <div class="deal-card-info">
            <span class="deal-card-badge">${item.category}</span>
            <h4 class="deal-card-title">${item.title}</h4>
            <p class="deal-card-meta">${item.camera || item.subtitle || ''}</p>
          </div>
        </div>
        <!-- BACK FACE: Royal Purple Matte Ink Panel with Gold Sunflower Monogram -->
        <div class="deal-card-back" aria-hidden="true">
          <div class="deal-back-pattern">
            <div class="deal-back-border">
              <img src="assets/svg/sunflower.svg" alt="" width="48" height="48" class="deal-back-logo" />
              <span class="deal-back-monogram">ST</span>
              <span class="deal-back-num">#${String(index + 1).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    wheelEl.appendChild(card);
    cardsElements.push(card);
  });
}

/**
 * Pre-decodes images with img.decode() so cards never pop in mid-flight
 */
function preloadImages() {
  cardsElements.forEach(card => {
    const img = card.querySelector('img');
    if (img && img.decode) {
      img.decode().catch(() => {});
    }
  });
}

/**
 * Intersection Observer triggers deal entrance smoothly when visible
 */
function setupIntersectionObserver() {
  const section = document.getElementById('photos');
  if (!section) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasEntered) {
        hasEntered = true;
        startDealSequence();
        observer.disconnect();
      }
    });
  }, { threshold: 0.15 });

  observer.observe(section);
}

/**
 * Starts the Deal sequence (0 -> 1), followed immediately by Lift (0 -> 1)
 */
export function startDealSequence() {
  dealProgress = 0;
  liftProgress = 0;
  dealStartTime = performance.now();
  liftStartTime = 0;

  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  lastTimestamp = performance.now();
  animationFrameId = requestAnimationFrame(renderLoop);
}

/**
 * Main RAF loop updating physics, transforms, sky & clouds
 */
function renderLoop(now) {
  const dt = Math.min((now - (lastTimestamp || now)) / 1000, 0.1);
  lastTimestamp = now;

  // Deal Animation (2.4s)
  if (dealProgress < 1) {
    const elapsed = (now - dealStartTime) / 2400;
    dealProgress = Math.min(1, elapsed);
    if (dealProgress === 1) {
      liftStartTime = now;
    }
  }

  // Lift Animation (1.9s)
  if (dealProgress === 1 && liftProgress < 1 && liftStartTime > 0) {
    const elapsed = (now - liftStartTime) / 1900;
    // Cubic bezier approx: strong ease (0.5, 0, 0.15, 1)
    const t = Math.min(1, elapsed);
    liftProgress = 1 - Math.pow(1 - t, 3.5);
  }

  // Physics: Exponential follow for drag/wheel
  spinAngle += (targetAngle - spinAngle) * (1 - Math.exp(-dt * 9));

  // Friction decay for flick velocity
  if (!isDragging && Math.abs(velocity) > 0.05) {
    targetAngle += velocity * dt;
    velocity *= Math.exp(-dt * 3.2);
  }

  // Natural idle drift (7 deg/sec) once lifted
  if (!isDragging && liftProgress > 0.1) {
    const driftSpeed = 6.5 * liftProgress * dt;
    targetAngle += driftSpeed;
    spinAngle += driftSpeed;
  }

  // Compute Geometry for current lift value
  const geom = liftGeometry(liftProgress);

  // Size the scene to the hero frame so the lifted wheel stays cleanly inside
  const stageHeight = stageEl ? stageEl.clientHeight : 720;
  const stageWidth = window.innerWidth || 1200;

  // Frame-proportional scale so the top card never pokes out of the frame
  const heightScale = Math.max(0.35, ((stageHeight / 2) - 80) / 540);
  const widthScale = stageWidth / 1400;
  const responsiveScale = Math.min(0.58, Math.max(0.36, Math.min(heightScale, widthScale * 0.72)));

  // Update Stage 3D Transform
  if (stageEl) {
    const stageTransform = `translateY(${geom.stageY}px) rotateX(${geom.stageRotateX}deg) scale(${(responsiveScale * geom.stageScaleBoost).toFixed(4)})`;
    writeStyle(stageEl, 'transform', stageTransform);
  }

  // Update Sky & Clouds Opacity & Rise
  if (skyEl) {
    writeStyle(skyEl, 'opacity', (0.15 + 0.85 * liftProgress).toFixed(3));
  }
  if (cloudsEl) {
    const cloudY = (60 * (1 - liftProgress)).toFixed(1);
    writeStyle(cloudsEl, 'transform', `translateY(${cloudY}px)`);
    writeStyle(cloudsEl, 'opacity', Math.min(1, 0.4 + 0.6 * liftProgress).toFixed(3));
  }

  // Update Each Card's Pose
  cardsElements.forEach((card, i) => {
    const pose = calculateCardPose({
      cardIndex: i,
      cardsCount: WHEEL_CARDS_COUNT,
      spin: spinAngle,
      deal: dealProgress,
      lift: liftProgress
    });

    if (!pose.visible) {
      writeStyle(card, 'visibility', 'hidden');
      return;
    }

    writeStyle(card, 'visibility', 'visible');
    writeStyle(card, 'transform', pose.transform);
    writeStyle(card, 'zIndex', String(Math.round(100 - pose.away)));
  });

  animationFrameId = requestAnimationFrame(renderLoop);
}

/**
 * Cache Map helper to skip redundant DOM style writes
 */
function writeStyle(element, prop, value) {
  if (!writtenStyles.has(element)) {
    writtenStyles.set(element, new Map());
  }
  const elMap = writtenStyles.get(element);
  if (elMap.get(prop) !== value) {
    elMap.set(prop, value);
    element.style[prop] = value;
  }
}

/**
 * Setup Pointer (Touch & Mouse) Gestures and Wheel
 */
function setupGestures() {
  if (!stageEl) return;

  const onPointerDown = (e) => {
    isDragging = true;
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    lastX = startX;
    lastPointerTime = performance.now();
    velocity = 0;
    dragDistance = 0;
    stageEl.style.cursor = 'grabbing';
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = currentX - lastX;
    dragDistance += Math.abs(deltaX);

    // Turn wheel (dragging right turns clockwise, dragging left turns counter-clockwise)
    targetAngle += deltaX * 0.16;

    const now = performance.now();
    const dt = Math.max(0.001, (now - lastPointerTime) / 1000);
    velocity = (deltaX / dt) * 0.22;

    lastX = currentX;
    lastPointerTime = now;
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    isDragging = false;
    stageEl.style.cursor = 'grab';

    // If pointer was static for >80ms before release, cancel flick
    if (performance.now() - lastPointerTime > 80) {
      velocity = 0;
    }
  };

  const viewportEl = document.getElementById('photos-deal-stage') || stageEl;
  if (!viewportEl) return;

  viewportEl.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  viewportEl.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Wheel interaction (turn wheel on mouse scroll over stage)
  viewportEl.addEventListener('wheel', (e) => {
    e.preventDefault();
    targetAngle += e.deltaY * 0.09;
  }, { passive: false });
}

/**
 * Setup Navigation Buttons & Replay
 */
function setupControls() {
  const prevBtn = document.getElementById('deal-prev-btn');
  const nextBtn = document.getElementById('deal-next-btn');
  const replayBtn = document.getElementById('deal-replay-btn');

  const step = 360 / WHEEL_CARDS_COUNT;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      targetAngle -= step;
      velocity = 0;
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      targetAngle += step;
      velocity = 0;
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      startDealSequence();
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    const activeSection = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
    if (!activeSection || !activeSection.closest('#photos')) return;

    if (e.key === 'ArrowLeft') {
      targetAngle -= step;
    } else if (e.key === 'ArrowRight') {
      targetAngle += step;
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  });
}

/**
 * Setup Lightbox Modal
 */
function setupLightbox() {
  if (!wheelEl || !modalEl) return;

  wheelEl.addEventListener('click', (e) => {
    // Prevent click if user was dragging
    if (dragDistance > 8) return;

    const card = e.target.closest('.deal-card');
    if (!card) return;

    const idx = parseInt(card.getAttribute('data-index'), 10);
    const item = photosData[idx];
    if (item) {
      openLightbox(item);
    }
  });

  const closeBtn = modalEl.querySelector('.photo-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) closeLightbox();
  });
}

function openLightbox(item) {
  if (!modalEl) return;
  const imgEl = modalEl.querySelector('.photo-modal-img');
  const titleEl = modalEl.querySelector('.photo-modal-title');
  const catEl = modalEl.querySelector('.photo-modal-category');
  const metaEl = modalEl.querySelector('.photo-modal-meta');
  const settingsEl = modalEl.querySelector('.photo-modal-settings');

  if (imgEl) imgEl.src = item.image;
  if (titleEl) titleEl.textContent = item.title;
  if (catEl) catEl.textContent = item.category;
  if (metaEl) metaEl.textContent = `${item.camera || ''} • ${item.year || ''}`;
  if (settingsEl) settingsEl.textContent = item.settings || '';

  modalEl.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!modalEl) return;
  modalEl.classList.remove('active');
  document.body.style.overflow = '';
}
