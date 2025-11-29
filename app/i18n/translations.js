import tr from './tr.json';
import en from './en.json';
import de from './de.json';

export const translations = { tr, en, de };

export function createTranslator(lang = 'en') {
  const data = translations[lang] || translations.en;
  return function t(path) {
    const parts = path.split('.');
    let value = data;
    for (const p of parts) {
      if (value && typeof value === 'object' && p in value) {
        value = value[p];
      } else {
        return path; // fallback
      }
    }
    return typeof value === 'string' ? value : path;
  };
}
