/* ==========================================================================
   JOURNAL MODULE
   Client-side Markdown rendering & anchor routing for public drafts and posts.
   ========================================================================== */

import { getLanguage } from './i18n.js';

export async function initJournal() {
  const container = document.getElementById('journal-grid');
  if (!container) return;

  try {
    const res = await fetch('data/posts.json');
    const posts = await res.json();
    renderJournal(container, posts);

    window.addEventListener('i18n:change', () => {
      renderJournal(container, posts);
    });
  } catch (err) {
    console.warn('Could not load posts.json', err);
  }
}

function renderJournal(container, posts) {
  container.innerHTML = '';
  const lang = getLanguage();

  posts.forEach((post) => {
    const card = document.createElement('article');
    card.className = 'journal-card card';
    card.id = `post-${post.slug}`;

    const title = post.title[lang] || post.title.en;
    const body = post.body[lang] || post.body.en;
    const dateText = post.date || (post.draft ? (lang === 'ja' ? 'ドラフト' : 'Draft') : '');

    card.innerHTML = `
      <div>
        <div class="journal-header">
          <span class="status-chip ${post.draft ? '' : 'done'}">${dateText}</span>
          <a href="#post-${post.slug}" class="journal-anchor" style="color: var(--gold); font-size: 0.85rem;" title="Link to post">#</a>
        </div>
        <h3 class="journal-title">${title}</h3>
        <p class="journal-body">${body}</p>
      </div>
    `;

    container.appendChild(card);
  });
}
