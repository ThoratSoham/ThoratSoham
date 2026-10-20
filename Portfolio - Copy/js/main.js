/* ==========================================================================
   SOHAM THORAT PORTFOLIO: MAIN ENTRYPOINT
   Modular orchestration for zero-build vanilla ES static architecture.
   ========================================================================== */

import { initGate } from './gate.js';
import { initI18n, t, getLanguage } from './i18n.js';
import { initCalm } from './calm.js';
import { initCursor } from './cursor.js';
import { initParallax } from './parallax.js';
import { initReveal } from './reveal.js';
import { initInstagram } from './instagram.js';
import { initPhotoWheel } from './photos.js';
import { initJournal } from './journal.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize foundational controls
  initCalm();
  await initI18n();

  // Initialize interactive systems
  initGate();
  initCursor();
  initParallax();
  initReveal();

  // Initialize data-driven sections
  initInstagram();
  initPhotoWheel();
  initJournal();
  loadProjects();
  loadAboutData();

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const expanded = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });

    // Close on navigation link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section spy for nav links
  setupScrollSpy();
});

// --------------------------------------------------------------------------
// Tech Lab / Projects Loader
// --------------------------------------------------------------------------
async function loadProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  try {
    const res = await fetch('data/projects.json');
    const projects = await res.json();
    renderProjects(container, projects);

    window.addEventListener('i18n:change', () => {
      renderProjects(container, projects);
    });
  } catch (err) {
    console.warn('Could not load projects.json', err);
  }
}

function renderProjects(container, projects) {
  container.innerHTML = '';
  projects.forEach((proj) => {
    const card = document.createElement('article');
    card.className = 'project-card card';

    const statusText = t(proj.statusKey) || proj.status;
    const isDone = proj.status === 'Complete';

    card.innerHTML = `
      <div>
        <div class="project-header-row">
          <h3 class="project-title">${proj.title}</h3>
          <span class="status-chip ${isDone ? 'done' : ''}">${statusText}</span>
        </div>
        <p class="project-desc">${proj.description}</p>
        <div class="project-tags">
          ${proj.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
        </div>
      </div>
      <div class="project-footer-row">
        <a href="${proj.repo}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="padding: 8px 16px; min-height: 40px; font-size: 0.875rem;">
          ${t('lab.repo')} ↗
        </a>
        ${proj.stars !== null ? `<span class="project-stars">★ ${proj.stars} stars</span>` : ''}
      </div>
    `;

    container.appendChild(card);
  });
}

// --------------------------------------------------------------------------
// About / Timeline & Certificates Loader
// --------------------------------------------------------------------------
async function loadAboutData() {
  const timelineContainer = document.getElementById('about-timeline');
  const certsContainer = document.getElementById('about-certs');
  if (!timelineContainer && !certsContainer) return;

  try {
    const res = await fetch('data/about.json');
    const data = await res.json();

    if (timelineContainer && data.timeline) {
      timelineContainer.innerHTML = '';
      data.timeline.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'timeline-item';
        const start = item.start || 'TBA';
        const end = item.end || '';
        const dates = end ? `${start} — ${end}` : start;

        div.innerHTML = `
          <div class="timeline-role">${item.role}</div>
          <div class="timeline-org">${item.org}</div>
          <div class="timeline-dates">${dates}</div>
        `;
        timelineContainer.appendChild(div);
      });
    }

    if (certsContainer && data.certificates) {
      certsContainer.innerHTML = '';
      data.certificates.forEach((cert) => {
        const div = document.createElement('div');
        div.className = 'cert-pill';
        div.textContent = cert;
        certsContainer.appendChild(div);
      });
    }
  } catch (err) {
    console.warn('Could not load about.json', err);
  }
}

// --------------------------------------------------------------------------
// ScrollSpy for Active Navigation Links
// --------------------------------------------------------------------------
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
