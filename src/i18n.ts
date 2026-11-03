import { createContext, useContext } from 'react'
import en from './content/en.json'
import es from './content/es.json'
import { SITE } from './content/site'

// Idiomas y textos. Cada idioma tiene su propio archivo JSON en src/content.
// es.json manda: en.json debe tener exactamente la misma estructura (TypeScript lo verifica).
export type Lang = 'es' | 'en'
export type Content = typeof es

export const CONTENT: Record<Lang, Content> = { es, en }

// Rutas de cada página por idioma (relativas a la base /AC4GROUP/).
export type PageKey = 'home' | 'terms' | 'privacy'
const PATHS: Record<PageKey, Record<Lang, string>> = {
  home: { es: '', en: 'en/' },
  terms: { es: 'terminos/', en: 'en/terms/' },
  privacy: { es: 'privacidad/', en: 'en/privacy/' },
}

/** URL interna con la base del sitio, p. ej. pagePath('terms', 'es') → /AC4GROUP/terminos/ */
export const pagePath = (page: PageKey, lang: Lang) => import.meta.env.BASE_URL + PATHS[page][lang]

/** URL absoluta (para canonical, hreflang, Open Graph y sitemap). */
export const absoluteUrl = (page: PageKey, lang: Lang) => SITE.url + PATHS[page][lang]

/** Todas las rutas que se prerenderizan (ver scripts/prerender.mjs). */
export const ROUTES = (Object.keys(PATHS) as PageKey[]).flatMap((page) =>
  (['es', 'en'] as Lang[]).map((lang) => ({ page, lang, path: PATHS[page][lang] })),
)

/** Deduce idioma y página a partir de la URL (p. ej. /AC4GROUP/en/terms/ → en, terms). */
export function routeFromPath(pathname: string): { lang: Lang; page: PageKey } {
  const rel = pathname.startsWith(import.meta.env.BASE_URL) ? pathname.slice(import.meta.env.BASE_URL.length) : ''
  for (const page of Object.keys(PATHS) as PageKey[]) {
    for (const lang of ['en', 'es'] as Lang[]) {
      if (PATHS[page][lang] && rel.replace(/index\.html$/, '') === PATHS[page][lang]) return { lang, page }
    }
  }
  return { lang: rel.startsWith('en/') ? 'en' : 'es', page: 'home' }
}

export type I18n ={ lang: Lang; page: PageKey; t: Content }
export const I18nContext = createContext<I18n>({ lang: 'es', page: 'home', t: es })

export const useI18n = () => useContext(I18nContext)

/** Guarda la preferencia de idioma. Es la única persistencia del sitio (ver Política de Privacidad). */
export function saveLangPreference(lang: Lang) {
  try {
    localStorage.setItem('ac4-lang', lang)
  } catch {
    // Navegación privada o almacenamiento bloqueado: no pasa nada.
  }
}
