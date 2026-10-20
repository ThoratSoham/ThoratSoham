/* ==========================================================================
   I18N TRANSLATION & FONT SWITCHER
   Supports English and Japanese with dynamic Japanese font loading.
   ========================================================================== */

let currentLang = 'en';
const translations = {
  en: {},
  ja: {}
};

let jpFontLoaded = false;

function loadJapaneseFonts() {
  if (jpFontLoaded) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Noto+Sans+JP:wght@500;700&display=swap';
  document.head.appendChild(link);
  jpFontLoaded = true;
}

export async function initI18n() {
  // Try loading saved preference
  const savedLang = localStorage.getItem('thorat_portfolio_lang');
  if (savedLang === 'ja' || savedLang === 'en') {
    currentLang = savedLang;
  }

  try {
    const [enRes, jaRes] = await Promise.all([
      fetch('i18n/en.json'),
      fetch('i18n/ja.json')
    ]);
    translations.en = await enRes.json();
    translations.ja = await jaRes.json();
  } catch (err) {
    console.warn('Failed to load i18n JSON files, using default English DOM content', err);
  }

  if (currentLang === 'ja') {
    loadJapaneseFonts();
  }

  applyTranslations();

  // Attach toggle button listeners
  const toggleButtons = document.querySelectorAll('.lang-toggle-btn');
  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setLanguage(currentLang === 'en' ? 'ja' : 'en');
    });
  });
}

export function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'ja') return;
  currentLang = lang;
  localStorage.setItem('thorat_portfolio_lang', lang);

  if (lang === 'ja') {
    loadJapaneseFonts();
  }

  applyTranslations();

  // Dispatch custom event for dynamic components
  window.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang } }));
}

export function getLanguage() {
  return currentLang;
}

export function t(key) {
  const langDict = translations[currentLang] || translations.en;
  return langDict[key] || translations.en[key] || key;
}

export function applyTranslations() {
  document.documentElement.setAttribute('lang', currentLang);

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (text) {
      el.textContent = text;
    }
  });

  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    const text = t(key);
    if (text) {
      el.setAttribute('placeholder', text);
    }
  });

  // Update toggle button labels
  const toggleButtons = document.querySelectorAll('.lang-toggle-btn');
  toggleButtons.forEach((btn) => {
    btn.textContent = currentLang === 'en' ? 'EN / 日本語' : '日本語 / EN';
  });
}
