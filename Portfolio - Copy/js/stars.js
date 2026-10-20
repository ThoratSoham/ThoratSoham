/* ==========================================================================
   ROTATING 'S' TALISMAN CONTROLLER
   Scroll-driven rotation, right-to-left center sway, and seamless content yielding.
   Zero drop-shadow or box filter to ensure pure screen blending without square frames.
   Butter-smooth requestAnimationFrame lerp loop for 60/120fps motion.
   ========================================================================== */

import { getCalmState } from './calm.js';

export function initStarS() {
  const container = document.getElementById('star-s-container');
  const canvas = document.getElementById('star-s-canvas');
  if (!container || !canvas) return;

  const ctx = canvas.getContext('2d');
  const totalFrames = 60;
  const frames = [];

  // Canvas internal buffer size for massive star
  canvas.width = 800;
  canvas.height = 450;

  // Preload 60 WebP frames
  for (let i = 1; i <= totalFrames; i++) {
    const img = new Image();
    const num = String(i).padStart(3, '0');
    img.src = `assets/star-s/frame-${num}.webp`;
    frames[i] = img;
  }

  // Draw initial frame once loaded
  frames[1].onload = () => {
    ctx.drawImage(frames[1], 0, 0, canvas.width, canvas.height);
  };

  let targetXOffset = 0;
  let currentXOffset = 0;
  let targetShift = 0;
  let currentShift = 0;
  let targetScale = 1.05;
  let currentScale = 1.05;
  let targetProgress = 0;
  let currentProgress = 0;
  let targetOpacity = 0;
  let currentOpacity = 0;

  function onScroll() {
    if (getCalmState()) {
      targetOpacity = 0;
      targetShift = 0;
      return;
    }

    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, scrollY / maxScroll));

    targetProgress = progress;

    if (scrollY < 100) {
      targetOpacity = (scrollY / 100) * 1.0;
    } else {
      targetOpacity = 1.0;
    }

    // Smooth continuous oscillation between right (+28vw) and left (-28vw)
    targetXOffset = Math.sin(progress * Math.PI * 4) * 28;
    targetScale = 1.05 + Math.cos(progress * Math.PI * 3) * 0.12;

    // Content gently sways in opposite direction to part space seamlessly for the massive star:
    // When star is on left (targetXOffset < 0), content glides right (+65px)
    // When star is on right (targetXOffset > 0), content glides left (-65px)
    targetShift = -Math.sin(progress * Math.PI * 4) * 65;
  }

  function renderLoop() {
    if (getCalmState()) {
      container.style.opacity = '0';
      document.documentElement.style.setProperty('--star-shift', '0px');
      requestAnimationFrame(renderLoop);
      return;
    }

    // High performance smooth lerping (linear interpolation)
    const lerp = 0.12;
    currentXOffset += (targetXOffset - currentXOffset) * lerp;
    currentShift += (targetShift - currentShift) * lerp;
    currentScale += (targetScale - currentScale) * lerp;
    currentProgress += (targetProgress - currentProgress) * 0.16;
    currentOpacity += (targetOpacity - currentOpacity) * lerp;

    container.style.opacity = currentOpacity.toFixed(3);
    container.style.transform = `translate3d(calc(-50% + ${currentXOffset.toFixed(2)}vw), -50%, 0) scale(${currentScale.toFixed(3)})`;
    document.documentElement.style.setProperty('--star-shift', `${currentShift.toFixed(2)}px`);

    // Draw rotating frame
    const frameIndex = (Math.floor(currentProgress * 8 * totalFrames) % totalFrames) + 1;
    const currentFrame = frames[frameIndex];
    if (currentFrame && currentFrame.complete && currentFrame.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(currentFrame, 0, 0, canvas.width, canvas.height);
    }

    requestAnimationFrame(renderLoop);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
  requestAnimationFrame(renderLoop);
}
