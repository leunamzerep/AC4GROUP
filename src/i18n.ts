import { createContext, useContext } from 'react'
import es from './content/es.json'

// Idiomas y textos. Cada idioma tiene su propio archivo JSON en src/content.
// PENDIENTE (fase 6): agregar en.json.
export type Lang = 'es' | 'en'
export type Content = typeof es

export const CONTENT: Record<Lang, Content> = { es, en: es }

// Rutas de cada página por idioma (relativas a la base /AC4GROUP/).
export type PageKey = 'home' | 'terms' | 'privacy'
const PATHS: Record<PageKey, Record<Lang, string>> = {
  home: { es: '', en: 'en/' },
  terms: { es: 'terminos/', en: 'en/terms/' },
  privacy: { es: 'privacidad/', en: 'en/privacy/' },
}

/** URL interna con la base del sitio, p. ej. pagePath('terms', 'es') → /AC4GROUP/terminos/ */
export const pagePath = (page: PageKey, lang: Lang) => import.meta.env.BASE_URL + PATHS[page][lang]

export type I18n = { lang: Lang; page: PageKey; t: Content }
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
