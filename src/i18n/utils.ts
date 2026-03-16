import en from '../data/i18n/en.json';
import es from '../data/i18n/es.json';

export type Locale = 'en' | 'es';

const translations = { en, es } as const;

export type Translations = typeof en;

export function getLang(url: URL): Locale {
  const [, segment] = url.pathname.split('/');
  return segment === 'es' ? 'es' : 'en';
}

export function useTranslations(lang: Locale): Translations {
  return translations[lang];
}
