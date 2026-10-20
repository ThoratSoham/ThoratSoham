/* ==========================================================================
   CALM MODE (LESS MOTION) CONTROLLER
   Disables wild effects, parallax, custom cursor, and autoplay.
   ========================================================================== */

let isCalm = false;

export function initCalm() {
  const savedCalm = localStorage.getItem('thorat_portfolio_calm');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (savedCalm !== null) {
    isCalm = savedCalm === 'true';
  } else if (prefersReduced) {
    isCalm = true;
  }

  applyCalmState();

  const toggleButtons = document.querySelectorAll('.calm-toggle-btn');
  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      toggleCalm();
    });
  });

  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    if (localStorage.getItem('thorat_portfolio_calm') === null) {
      isCalm = e.matches;
      applyCalmState();
    }
  });
}

export function toggleCalm() {
  isCalm = !isCalm;
  localStorage.setItem('thorat_portfolio_calm', isCalm.toString());
  applyCalmState();
}

export function getCalmState() {
  return isCalm;
}

function applyCalmState() {
  if (isCalm) {
    document.documentElement.classList.add('calm-mode');
  } else {
    document.documentElement.classList.remove('calm-mode');
  }

  const toggleButtons = document.querySelectorAll('.calm-toggle-btn');
  toggleButtons.forEach((btn) => {
    btn.classList.toggle('active', isCalm);
  });

  window.dispatchEvent(new CustomEvent('calm:change', { detail: { isCalm } }));
}
