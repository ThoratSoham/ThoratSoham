/* ==========================================================================
   CUSTOM GOLD CURSOR
   Desktop fine pointer only. Changes label based on target element.
   ========================================================================== */

import { getCalmState } from './calm.js';

export function initCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const cursor = document.getElementById('custom-cursor');
  const label = document.getElementById('custom-cursor-label');
  if (!cursor || !label) return;

  let mouseX = -100;
  let mouseY = -100;
  let currentX = -100;
  let currentY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    if (getCalmState()) {
      cursor.style.display = 'none';
      return;
    }

    cursor.style.display = 'flex';
    currentX += (mouseX - currentX) * 0.25;
    currentY += (mouseY - currentY) * 0.25;
    cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(renderCursor);
  }

  requestAnimationFrame(renderCursor);

  // Dynamic hover label inspection
  document.addEventListener('mouseover', (e) => {
    if (getCalmState()) return;

    const target = e.target.closest('a, button, [data-cursor-label], .card');
    if (target) {
      cursor.classList.add('active');
      const customText = target.getAttribute('data-cursor-label') || 
        (target.tagName === 'A' ? 'Open' : target.tagName === 'BUTTON' ? 'Click' : 'View');
      label.textContent = customText;
    } else {
      cursor.classList.remove('active');
    }
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
}
