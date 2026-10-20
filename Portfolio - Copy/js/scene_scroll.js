// --------------------------------------------------------------------------
// Studio Walk-in Sequence (75 Frames Scroll Scrub)
// --------------------------------------------------------------------------
export function initSceneScroll() {
  const canvas = document.getElementById('scene-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const stage = document.getElementById('hero-scroll-scene');
  const frameCounter = document.getElementById('scene-frame-counter');
  const totalFrames = 75;
  const frameImages = [];

  canvas.width = 960;
  canvas.height = 540;

  // Load first frame immediately
  const firstFrame = new Image();
  firstFrame.src = 'assets/scene/scene-001.webp';
  firstFrame.onload = () => {
    ctx.drawImage(firstFrame, 0, 0, canvas.width, canvas.height);
  };
  frameImages[1] = firstFrame;

  // Preload rest of the frames
  for (let i = 2; i <= totalFrames; i++) {
    const img = new Image();
    const frameNumber = String(i).padStart(3, '0');
    img.src = `assets/scene/scene-${frameNumber}.webp`;
    frameImages[i] = img;
  }

  let lastIndex = 1;

  function render() {
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const windowH = window.innerHeight;

    const totalScrollable = rect.height - windowH;
    if (totalScrollable <= 0) return;

    // Progress from 0 (entering stage) to 1 (leaving stage)
    const scrollOffset = -rect.top;
    const progress = Math.max(0, Math.min(1, scrollOffset / totalScrollable));

    const targetIndex = Math.min(totalFrames, Math.max(1, Math.floor(progress * (totalFrames - 1)) + 1));

    if (targetIndex !== lastIndex) {
      lastIndex = targetIndex;
      const currentImg = frameImages[targetIndex];
      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);
      }
      if (frameCounter) {
        frameCounter.textContent = String(targetIndex).padStart(2, '0');
      }

      // Maximize dynamic contrast and brightness when seated
      if (progress > 0.4) {
        canvas.style.filter = 'contrast(1.15) brightness(1.35) saturate(1.18)';
      } else {
        canvas.style.filter = 'contrast(1.08) brightness(1.1) saturate(1.02)';
      }
    }
  }

  window.addEventListener('scroll', render, { passive: true });
  window.addEventListener('resize', render, { passive: true });
  
  // Continuous loop to catch smooth scrolling (Lenis / Locomotive)
  let isRunning = true;
  function loop() {
    render();
    if (isRunning) requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSceneScroll);
} else {
  initSceneScroll();
}
