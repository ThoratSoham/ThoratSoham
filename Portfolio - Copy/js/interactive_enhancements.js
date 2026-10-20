// Interactive Enhancements: Tech Cards Image Cycler & 3D Tilt Sticker
document.addEventListener('DOMContentLoaded', () => {
  initTechCardsCycler();
  initStickerTilt();
});

// Also initialize if DOM is already ready
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initTechCardsCycler();
  initStickerTilt();
}

/**
 * 1. Tech Cards Gallery Image Cycler
 * Swaps background artwork every 500ms (0.5 sec) across all three tech lab cards
 */
function initTechCardsCycler() {
  const kidGallery = [
    'kid/vee-east.webp',
    'kid/special.webp',
    'kid/vertical.webp',
    'kid/v-card.webp',
    'kid/horizontal.webp',
    'kid/bar.webp',
    'kid/pill.webp',
    'kid/deck.webp',
    'kid/fan.webp',
    'kid/tri.webp',
    'kid/vee-west.webp',
    'kid/win.webp',
    'kid/dial.webp',
    'kid/clock.webp'
  ];

  // Preload all gallery images in cache to avoid any flash or jitter
  kidGallery.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  const cards = [
    document.querySelector('#project-texthumaniser .v-card__plate img'),
    document.querySelector('#project-telco .v-card__plate img'),
    document.querySelector('#project-mentor .v-card__plate img')
  ].filter(Boolean);

  if (cards.length === 0) return;

  let step = 0;
  setInterval(() => {
    step++;
    cards.forEach((imgEl, index) => {
      // Offset each card by 4 items so they each show distinct visuals
      const galleryIndex = (step + index * 4) % kidGallery.length;
      imgEl.src = kidGallery[galleryIndex];
    });
  }, 500); // exactly every 0.5s
}

/**
 * 2. 3D Interactive Cursor-Tilt Sticker in About Section
 * Rotates smoothly in 3D space in response to cursor position
 */
function initStickerTilt() {
  const stickerWrap = document.getElementById('about-sticker-wrap');
  if (!stickerWrap) return;
  
  const stickerImg = stickerWrap.querySelector('.about-sticker-img');
  if (!stickerImg) return;

  const aboutPlate = document.querySelector('.win__plate--main');
  const targetArea = aboutPlate || stickerWrap;

  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let rafId = null;

  function updateTilt() {
    currentX += (targetX - currentX) * 0.15;
    currentY += (targetY - currentY) * 0.15;

    stickerImg.style.transform = `perspective(700px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale3d(1.05, 1.05, 1.05)`;

    if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
      rafId = requestAnimationFrame(updateTilt);
    } else {
      rafId = null;
    }
  }

  function onMouseMove(e) {
    const rect = stickerWrap.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (window.innerWidth * 0.35);
    const deltaY = (e.clientY - centerY) / (window.innerHeight * 0.35);

    // Limit maximum tilt to 22 degrees
    targetY = Math.max(-22, Math.min(22, deltaX * 20));
    targetX = Math.max(-22, Math.min(22, -deltaY * 20));

    if (!rafId) {
      rafId = requestAnimationFrame(updateTilt);
    }
  }

  function onMouseLeave() {
    targetX = 0;
    targetY = 0;
    if (!rafId) {
      rafId = requestAnimationFrame(updateTilt);
    }
  }

  targetArea.addEventListener('mousemove', onMouseMove, { passive: true });
  targetArea.addEventListener('mouseleave', onMouseLeave);
}
