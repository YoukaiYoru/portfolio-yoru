import { ref, computed, readonly } from 'vue';
import { translations } from '@data/i18n';

export type Lang = 'es' | 'en';

const lang = ref<Lang>('es');
const currentTranslations = computed(() => translations[lang.value]);

export { lang };

export function t(key: string): string {
  return currentTranslations.value[key] ?? key;
}

export function useLang() {
  return { lang: readonly(lang), t, setLang, toggleLang };
}

export function setLang(l: Lang) {
  lang.value = l;
  try { localStorage.setItem('portfolio-lang', l); } catch {}
  document.documentElement.lang = l;
  applyDomTranslations();
}

export function toggleLang() {
  setLang(lang.value === 'es' ? 'en' : 'es');
}

export function applyDomTranslations() {
  const dict = currentTranslations.value;

  // Update text-only elements (leaf nodes with no child elements)
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (!key || !(key in dict)) return;

    // If element has data-i18n-attr, only update that attribute (skip textContent)
    if (el.hasAttribute('data-i18n-attr')) {
      const attr = el.getAttribute('data-i18n-attr')!;
      el.setAttribute(attr, dict[key]);
      return;
    }

    // Safety: only update textContent if element has no child *elements* (only text nodes)
    const hasChildElements = el.children.length > 0;
    if (!hasChildElements) {
      el.textContent = dict[key];
    }
  });

  // Update data-i18n-subject links
  document.querySelectorAll<HTMLAnchorElement>('[data-i18n-subject]').forEach(el => {
    const key = el.getAttribute('data-i18n-subject');
    if (key && key in dict) {
      const base = el.href.split('?')[0];
      el.href = `${base}?subject=${encodeURIComponent(dict[key])}`;
    }
  });
}

export function initLang() {
  try {
    const stored = localStorage.getItem('portfolio-lang');
    if (stored === 'es' || stored === 'en') lang.value = stored;
  } catch {}
  document.documentElement.lang = lang.value;
  if (typeof document !== 'undefined') {
    requestAnimationFrame(() => applyDomTranslations());
    // Re-apply after Astro view transitions
    document.addEventListener('astro:page-load', () => applyDomTranslations());
  }
}
