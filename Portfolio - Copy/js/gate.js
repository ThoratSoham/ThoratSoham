/* ==========================================================================
   ENTRY GATE MODULE
   Tracks real asset preloading (fonts, portrait, first video poster)
   Provides Skip, joke line, and scalloped wipe reveal.
   ========================================================================== */

export function initGate() {
  const gate = document.getElementById('entry-gate');
  if (!gate) return;

  // Check if previously entered this session
  if (sessionStorage.getItem('thorat_portfolio_gate_seen') === 'true') {
    gate.style.display = 'none';
    return;
  }

  // Check reduced motion or calm mode
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCalm = document.documentElement.classList.contains('calm-mode');
  if (prefersReduced || isCalm) {
    gate.style.display = 'none';
    return;
  }

  const enterBtn = document.getElementById('gate-enter-btn');
  const skipBtn = document.getElementById('gate-skip-btn');

  let currentPercent = 0;
  let targetPercent = 10;

  // Assets to preload
  const assetsToPreload = [
    'assets/images/favicon.png',
    'assets/video/transition-flame.jpg',
    'assets/scene/scene-001.webp'
  ];

  let loadedCount = 0;
  const totalAssets = assetsToPreload.length;

  function updateDisplay() {
    if (currentPercent < targetPercent) {
      currentPercent += Math.ceil((targetPercent - currentPercent) * 0.2);
    }

    if (currentPercent >= 100) {
      currentPercent = 100;
      if (enterBtn) enterBtn.classList.add('visible');
    } else {
      requestAnimationFrame(updateDisplay);
    }
  }

  function markProgress() {
    loadedCount++;
    targetPercent = Math.min(100, Math.round(20 + (loadedCount / totalAssets) * 80));
    requestAnimationFrame(updateDisplay);
  }

  // Preload font
  if (document.fonts) {
    document.fonts.ready.then(() => {
      targetPercent = Math.max(targetPercent, 35);
      requestAnimationFrame(updateDisplay);
    });
  }

  // Preload images
  assetsToPreload.forEach((src) => {
    const img = new Image();
    img.onload = markProgress;
    img.onerror = markProgress;
    img.src = src;
  });

  // Safety fallback: reach 100 within 2.5s maximum
  const fallbackTimer = setTimeout(() => {
    targetPercent = 100;
    requestAnimationFrame(updateDisplay);
  }, 2500);

  function dismissGate() {
    clearTimeout(fallbackTimer);
    sessionStorage.setItem('thorat_portfolio_gate_seen', 'true');
    gate.classList.add('dismissed');
    setTimeout(() => {
      gate.style.display = 'none';
    }, 700);

    // If on iOS, prompt for tilt button visibility
    const tiltBtn = document.getElementById('hero-tilt-btn');
    if (tiltBtn && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      tiltBtn.style.display = 'inline-flex';
    }
  }

  if (enterBtn) enterBtn.addEventListener('click', dismissGate);
  if (skipBtn) skipBtn.addEventListener('click', dismissGate);
}
