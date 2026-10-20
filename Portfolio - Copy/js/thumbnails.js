/* ==========================================================================
   INTERACTIVE THUMBNAIL PORTFOLIO LOGIC
   Handles Before/After Split Drag Sliders, View Modes (Slider, Side-by-Side,
   YouTube Feed Mockup), Niche Filtering & Lightbox Modal.
   ========================================================================== */

let thumbnailsData = [];
let activeNiche = 'all';
let activeViewMode = 'slider'; // 'slider' | 'sidebyside' | 'youtube'

document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initTime();
  await loadThumbnails();
  initFilters();
  initViewModes();
  initModal();
});

async function loadThumbnails() {
  const grid = document.getElementById('thumbnails-grid');
  if (!grid) return;

  try {
    const res = await fetch('data/thumbnails.json');
    if (!res.ok) throw new Error('Failed to load thumbnails.json');
    thumbnailsData = await res.json();
    renderCards();
  } catch (err) {
    console.error('Error loading thumbnails:', err);
    grid.innerHTML = '<p style="color: #ff6b6b; text-align: center; grid-column: 1/-1;">Failed to load thumbnails. Please refresh.</p>';
  }
}

function renderCards() {
  const grid = document.getElementById('thumbnails-grid');
  if (!grid) return;

  const filtered = activeNiche === 'all'
    ? thumbnailsData
    : thumbnailsData.filter(item => item.niche === activeNiche);

  grid.className = `thumb-cards-grid mode-${activeViewMode}`;
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color: #b5a4d4; text-align: center; grid-column: 1/-1; padding: 40px 0;">No thumbnails found in this category.</p>';
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('article');
    card.className = 'thumb-card';
    card.setAttribute('data-id', item.id);
    card.setAttribute('data-niche', item.niche);

    if (activeViewMode === 'slider') {
      card.innerHTML = buildSliderCardHTML(item);
    } else if (activeViewMode === 'sidebyside') {
      card.innerHTML = buildSideBySideCardHTML(item);
    } else if (activeViewMode === 'youtube') {
      card.innerHTML = buildYouTubeCardHTML(item);
    }

    grid.appendChild(card);
  });

  if (activeViewMode === 'slider') {
    setupSplitSliders();
  }
  setupCardButtons();
}

function buildSliderCardHTML(item) {
  return `
    <div class="thumb-split-box" data-split="50" role="region" aria-label="Before/After Split comparison for ${item.title}">
      <!-- ORIGINAL (Before, Underneath) -->
      <img src="${item.originalImage}" alt="Original before: ${item.title}" class="thumb-split-img" loading="lazy">
      
      <!-- SOHAM REMAKE (After, Top Layer) -->
      <div class="thumb-remake-layer" style="width: 50%;">
        <img src="${item.remakeImage}" alt="Soham remake after: ${item.title}" class="thumb-remake-img" loading="lazy">
      </div>

      <!-- Split Line & Handle -->
      <div class="thumb-split-divider" style="left: 50%;">
        <div class="thumb-split-handle" aria-hidden="true">‹ ›</div>
      </div>

      <!-- Badges -->
      <span class="thumb-pill after">Remake (After)</span>
      <span class="thumb-pill before">Original (Before)</span>
      <span class="thumb-drag-hint">Drag or Tap to Compare</span>
    </div>

    <div class="thumb-card-body">
      <div class="thumb-card-top-row">
        <h3 class="thumb-card-title">${item.title}</h3>
        <span class="thumb-niche-tag ${item.niche}">${item.nicheName}</span>
      </div>
      <div class="thumb-card-strategy-compact">
        <span class="strategy-label">Hook:</span> ${item.strategy}
      </div>
      <div class="thumb-card-actions">
        <button type="button" class="thumb-toggle-quick-btn" data-toggle-id="${item.id}">Quick Flip</button>
        <button type="button" class="thumb-zoom-btn" data-zoom-id="${item.id}">Inspect ↗</button>
      </div>
    </div>
  `;
}

function buildSideBySideCardHTML(item) {
  return `
    <div class="thumb-sidebyside-container">
      <div class="thumb-side-pane">
        <span class="thumb-pill before">Original (Before)</span>
        <img src="${item.originalImage}" alt="Original before: ${item.title}" loading="lazy">
      </div>
      <div class="thumb-side-pane remake-pane">
        <span class="thumb-pill after">Soham's Remake (After)</span>
        <img src="${item.remakeImage}" alt="Soham remake after: ${item.title}" loading="lazy">
      </div>
    </div>
    <div class="thumb-card-body">
      <div class="thumb-card-top-row">
        <h3 class="thumb-card-title">${item.title}</h3>
        <span class="thumb-niche-tag ${item.niche}">${item.nicheName}</span>
      </div>
      <div class="thumb-card-strategy-compact">
        <span class="strategy-label">Hook:</span> ${item.strategy}
      </div>
      <div class="thumb-card-actions">
        <button type="button" class="thumb-zoom-btn" data-zoom-id="${item.id}">Inspect Full Size ↗</button>
      </div>
    </div>
  `;
}

function buildYouTubeCardHTML(item) {
  // Realistic YouTube view metrics
  const views = Math.floor(Math.random() * 850 + 120) + 'K views';
  const days = Math.floor(Math.random() * 12 + 1) + ' days ago';
  
  return `
    <div class="thumb-split-box" style="cursor: pointer;" data-zoom-id="${item.id}">
      <img src="${item.remakeImage}" alt="${item.title}" class="thumb-split-img" loading="lazy">
      <span style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.85); color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; font-family: monospace;">14:28</span>
    </div>
    <div class="thumb-card-body">
      <div class="thumb-yt-avatar">ST</div>
      <div class="thumb-yt-meta">
        <h3 class="thumb-card-title">${item.title}</h3>
        <div class="thumb-yt-channel">
          <span>Soham Thorat</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#aaa"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7l-4.2-4.2 1.4-1.4 2.8 2.8 6.8-6.8 1.4 1.4-8.2 8.2z"/></svg>
        </div>
        <div class="thumb-yt-stats">${views} • ${days}</div>
      </div>
    </div>
  `;
}

function setupSplitSliders() {
  const splitBoxes = document.querySelectorAll('.thumb-split-box');

  splitBoxes.forEach(box => {
    let isDown = false;

    const updateSlider = (clientX) => {
      const rect = box.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));

      const remakeLayer = box.querySelector('.thumb-remake-layer');
      const divider = box.querySelector('.thumb-split-divider');

      if (remakeLayer) remakeLayer.style.width = `${percent}%`;
      if (divider) divider.style.left = `${percent}%`;
      box.setAttribute('data-split', percent.toFixed(1));
    };

    box.addEventListener('mousedown', (e) => {
      isDown = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDown = false;
    });

    // Touch events
    box.addEventListener('touchstart', (e) => {
      isDown = true;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    }, { passive: true });

    box.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDown = false;
    });
  });
}

function setupCardButtons() {
  // Quick Toggle Before/After
  document.querySelectorAll('.thumb-toggle-quick-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.thumb-card');
      const box = card.querySelector('.thumb-split-box');
      if (!box) return;

      const currentSplit = parseFloat(box.getAttribute('data-split') || '50');
      const targetSplit = currentSplit < 50 ? 100 : 0;

      const remakeLayer = box.querySelector('.thumb-remake-layer');
      const divider = box.querySelector('.thumb-split-divider');

      if (remakeLayer) {
        remakeLayer.style.transition = 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        remakeLayer.style.width = `${targetSplit}%`;
      }
      if (divider) {
        divider.style.transition = 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        divider.style.left = `${targetSplit}%`;
      }

      box.setAttribute('data-split', String(targetSplit));

      setTimeout(() => {
        if (remakeLayer) remakeLayer.style.transition = '';
        if (divider) divider.style.transition = '';
      }, 350);
    });
  });

  // Lightbox Zoom
  document.querySelectorAll('[data-zoom-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-zoom-id');
      const item = thumbnailsData.find(t => t.id === id);
      if (item) openModal(item);
    });
  });
}

function initFilters() {
  const chips = document.querySelectorAll('.thumb-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeNiche = chip.getAttribute('data-filter') || 'all';
      renderCards();
    });
  });
}

function initViewModes() {
  const viewBtns = document.querySelectorAll('.thumb-view-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeViewMode = btn.getAttribute('data-view') || 'slider';
      renderCards();
    });
  });
}

function initModal() {
  const modal = document.getElementById('thumb-modal');
  const closeBtn = document.getElementById('thumb-modal-close');
  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function openModal(item) {
  const modal = document.getElementById('thumb-modal');
  const viewer = document.getElementById('thumb-modal-viewer');
  const title = document.getElementById('thumb-modal-title');
  const strat = document.getElementById('thumb-modal-strategy');
  if (!modal || !viewer) return;

  viewer.innerHTML = `
    <div class="thumb-split-box" data-split="50" style="width: 100%; height: 100%;">
      <img src="${item.originalImage}" alt="Original" class="thumb-split-img">
      <div class="thumb-remake-layer" style="width: 50%;">
        <img src="${item.remakeImage}" alt="Remake" class="thumb-remake-img">
      </div>
      <div class="thumb-split-divider" style="left: 50%;">
        <div class="thumb-split-handle">‹ ›</div>
      </div>
      <span class="thumb-pill after">Soham's Remake (After)</span>
      <span class="thumb-pill before">Original (Before)</span>
    </div>
  `;

  if (title) title.textContent = `${item.title} — ${item.nicheName}`;
  if (strat) {
    strat.innerHTML = `
      <p style="margin-bottom: 8px;"><strong>Overview:</strong> ${item.tagline}</p>
      <p><strong>Psychology & CTR Strategy:</strong> ${item.strategy}</p>
    `;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Enable split drag on modal viewer
  setupSplitSliders();
}

function closeModal() {
  const modal = document.getElementById('thumb-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Stash Theme Management (Light / Dark)
function initTheme() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('thorat_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('thorat_theme', next);
    });
  }
}

// Stash Live Clock
function initTime() {
  const timeEls = document.querySelectorAll('.live-time');
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}:${seconds} IST`;
    timeEls.forEach(el => el.textContent = timeStr);
  }
  updateClock();
  setInterval(updateClock, 1000);
}

