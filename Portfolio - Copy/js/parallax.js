/* ==========================================================================
   PARALLAX, TILT & SUNGLASSES GLINT
   Layered depth, mouse & phone tilt, sunglasses glint, and 5-click sunflower burst.
   ========================================================================== */

import { getCalmState } from './calm.js';

export function initParallax() {
  const portraitFrame = document.querySelector('.hero-portrait-frame');
  const heroNameBg = document.querySelector('.hero-name-bg');
  const decoSunflower = document.querySelector('.hero-deco-sunflower');
  const decoPaisley = document.querySelector('.hero-deco-paisley');
  const tiltBtn = document.getElementById('hero-tilt-btn');

  if (!portraitFrame && !heroNameBg && !decoSunflower && !decoPaisley) {
    if (tiltBtn) tiltBtn.style.display = 'none';
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let idleTime = 0;

  // Mouse Parallax
  window.addEventListener('mousemove', (e) => {
    if (getCalmState()) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    targetX = (e.clientX - cx) / cx;
    targetY = (e.clientY - cy) / cy;
    idleTime = 0;
  });

  // Mobile Tilt
  let tiltEnabled = false;

  function handleOrientation(e) {
    if (getCalmState() || !tiltEnabled) return;
    const gamma = e.gamma || 0; // -90 to 90
    const beta = e.beta || 0;   // -180 to 180
    targetX = Math.max(-1, Math.min(1, gamma / 25));
    targetY = Math.max(-1, Math.min(1, (beta - 45) / 25));
    idleTime = 0;
  }

  if (tiltBtn) {
    tiltBtn.addEventListener('click', async () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            tiltEnabled = true;
            window.addEventListener('deviceorientation', handleOrientation);
            tiltBtn.textContent = 'Tilt Enabled';
            tiltBtn.style.opacity = '0.6';
          }
        } catch (err) {
          console.warn('Orientation permission error:', err);
        }
      } else {
        tiltEnabled = true;
        window.addEventListener('deviceorientation', handleOrientation);
        tiltBtn.textContent = 'Tilt Active';
      }
    });
  }

  // Animation Loop with Idle Sway
  function animate() {
    if (getCalmState()) {
      if (portraitFrame) portraitFrame.style.transform = 'none';
      if (heroNameBg) heroNameBg.style.transform = 'translateY(-50%)';
      if (decoSunflower) decoSunflower.style.transform = 'rotate(15deg)';
      if (decoPaisley) decoPaisley.style.transform = 'rotate(-20deg)';
      requestAnimationFrame(animate);
      return;
    }

    idleTime += 0.02;
    // Gentle idle sway if mouse is still
    const swayX = Math.sin(idleTime) * 0.08;
    const swayY = Math.cos(idleTime * 0.8) * 0.06;

    mouseX += (targetX + swayX - mouseX) * 0.06;
    mouseY += (targetY + swayY - mouseY) * 0.06;

    if (portraitFrame) {
      portraitFrame.style.transform = `translate3d(${mouseX * 18}px, ${mouseY * 18}px, 0)`;
    }
    if (heroNameBg) {
      heroNameBg.style.transform = `translate3d(${-mouseX * 24}px, calc(-50% + ${-mouseY * 20}px), 0)`;
    }
    if (decoSunflower) {
      decoSunflower.style.transform = `translate3d(${mouseX * 32}px, ${mouseY * 32}px, 0) rotate(${15 + mouseX * 10}deg)`;
    }
    if (decoPaisley) {
      decoPaisley.style.transform = `translate3d(${-mouseX * 14}px, ${-mouseY * 14}px, 0) rotate(${-20 + mouseY * 8}deg)`;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  // Sunglasses Glint on Tap / Hover
  if (portraitFrame) {
    portraitFrame.addEventListener('mouseenter', triggerGlint);
    portraitFrame.addEventListener('click', triggerGlint);
  }

  function triggerGlint() {
    if (!portraitFrame) return;
    portraitFrame.classList.remove('tap-glint');
    // Force reflow
    void portraitFrame.offsetWidth;
    portraitFrame.classList.add('tap-glint');
  }

  // 5-Click Easter Egg: Sunflower Burst!
  let clickCount = 0;
  let clickTimer = null;

  if (portraitFrame) {
    portraitFrame.addEventListener('click', () => {
      clickCount++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => { clickCount = 0; }, 1800);

      if (clickCount >= 5) {
        clickCount = 0;
        triggerSunflowerBurst();
      }
    });
  }

  function triggerSunflowerBurst() {
    const burstContainer = document.getElementById('sunflower-burst');
    if (!burstContainer) return;

    for (let i = 0; i < 14; i++) {
      const flower = document.createElement('img');
      flower.src = 'assets/svg/sunflower.svg';
      flower.className = 'burst-sunflower';
      const angle = (i / 14) * 2 * Math.PI;
      const dist = 80 + Math.random() * 120;
      const dx = `${Math.cos(angle) * dist}px`;
      const dy = `${Math.sin(angle) * dist}px`;
      flower.style.setProperty('--dx', dx);
      flower.style.setProperty('--dy', dy);
      flower.style.left = '50%';
      flower.style.top = '40%';
      burstContainer.appendChild(flower);

      setTimeout(() => {
        flower.remove();
      }, 1000);
    }
  }
}
