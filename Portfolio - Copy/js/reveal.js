/* ==========================================================================
   REVEAL, VIDEO CONTROLLER & SCROLL SCENE CANVAS
   Section reveals, video view-port play/pause, and scroll-driven frame scrubbing.
   ========================================================================== */

import { getCalmState } from './calm.js';

export function initReveal() {
  initScrollReveals();
  initVideoPlayback();
  initScrollScene();
}

function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));
}

function initVideoPlayback() {
  const videos = document.querySelectorAll('video[data-inview-play]');

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (getCalmState()) {
        video.pause();
        return;
      }

      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.2 });

  videos.forEach(v => videoObserver.observe(v));

  window.addEventListener('calm:change', (e) => {
    if (e.detail.isCalm) {
      videos.forEach(v => v.pause());
    }
  });
}

// --------------------------------------------------------------------------
// Canvas Scroll Scene (75 frames of Walk-in to Sit)
// --------------------------------------------------------------------------
function initScrollScene() {
  const canvas = document.getElementById('scene-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const totalFrames = 75;
  const isMobile = window.innerWidth < 768;
  const step = isMobile ? 2 : 1;
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

  // Background preload rest of the frames
  for (let i = 2; i <= totalFrames; i += step) {
    const img = new Image();
    const frameNumber = String(i).padStart(3, '0');
    img.src = `assets/scene/scene-${frameNumber}.webp`;
    frameImages[i] = img;
  }

  // Scroll tracking across the entire stage (Hero + Marquee + CREATE)
  const stage = document.querySelector('.scroll-scene-stage');
  if (!stage) return;

  function onScroll() {
    if (getCalmState()) return;

    const rect = stage.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalScrollable = rect.height - windowH;
    if (totalScrollable <= 0) return;

    // Progress from 0 (top of Hero) to 1 (end of CREATE)
    const scrollOffset = -rect.top;
    const progress = Math.max(0, Math.min(1, scrollOffset / totalScrollable));
    let targetIndex = Math.floor(progress * (totalFrames - 1)) + 1;
    if (step === 2 && targetIndex % 2 === 0) {
      targetIndex = Math.max(1, targetIndex - 1);
    }

    const currentImg = frameImages[targetIndex];
    if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
      ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);
    }

    // When Soham sitting section is shown, dynamically maximize brightness and clarity
    const shade = document.querySelector('.canvas-shade-overlay');
    if (progress > 0.2) {
      canvas.style.filter = 'contrast(1.15) brightness(1.38) saturate(1.18)';
      if (shade) shade.style.opacity = '0.25';
    } else {
      // In Hero section, maintain strong text legibility and contrast
      canvas.style.filter = 'contrast(1.08) brightness(1.08) saturate(1.02)';
      if (shade) shade.style.opacity = '0.82';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}
