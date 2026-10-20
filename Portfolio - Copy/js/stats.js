/* ==========================================================================
   STATS STRIP MODULE
   Renders real verified numbers with count-up animation. Unknown values remain null/hidden.
   ========================================================================== */

import { getLanguage } from './i18n.js';

export async function initStats() {
  const container = document.getElementById('stats-grid');
  if (!container) return;

  try {
    const res = await fetch('data/stats.json');
    const statsData = await res.json();
    renderStats(container, statsData);

    window.addEventListener('i18n:change', () => {
      renderStats(container, statsData);
    });
  } catch (err) {
    console.warn('Could not load stats.json', err);
  }
}

function renderStats(container, statsData) {
  container.innerHTML = '';
  const lang = getLanguage();

  statsData.forEach((stat) => {
    // Hide null values strictly as instructed
    if (stat.value === null || stat.value === undefined) return;

    const statItem = document.createElement('div');
    statItem.className = 'stat-item';

    const labelText = typeof stat.label === 'object' ? (stat.label[lang] || stat.label.en) : stat.label;

    statItem.innerHTML = `
      <div class="stat-number" data-target="${stat.value}" data-format="${stat.format || 'int'}">0</div>
      <div class="stat-label">${labelText}</div>
    `;

    container.appendChild(statItem);
  });

  setupCounterObserver(container);
}

function setupCounterObserver(container) {
  const numbers = container.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  numbers.forEach(num => observer.observe(num));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const format = el.getAttribute('data-format');
  const duration = 1200;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / duration);
    // Ease out quart
    const ease = 1 - Math.pow(1 - progress, 4);
    const currentVal = Math.round(target * ease);

    if (format === 'k' && target >= 1000) {
      el.textContent = `${Math.round(currentVal / 1000)}K+`;
    } else {
      el.textContent = currentVal.toLocaleString();
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      if (format === 'k' && target >= 1000) {
        el.textContent = `${Math.round(target / 1000)}K+`;
      } else {
        el.textContent = target.toLocaleString();
      }
    }
  }

  requestAnimationFrame(update);
}
