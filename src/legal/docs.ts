import type { Lang } from '../i18n'
import { parseLegal, type LegalDoc } from './markdown'

// Textos legales en Markdown. Para editarlos, cambia los .md en src/content/legal/<idioma>/.
const FILES = import.meta.glob('../content/legal/*/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>

const FILE_NAMES = {
  terms: { es: 'es/terminos.md', en: 'en/terms.md' },
  privacy: { es: 'es/privacidad.md', en: 'en/privacy.md' },
} as const

export type LegalKey = keyof typeof FILE_NAMES

export function getLegalDoc(key: LegalKey, lang: Lang): LegalDoc {
  const md = FILES[`../content/legal/${FILE_NAMES[key][lang]}`]
  if (!md) throw new Error(`Falta el texto legal ${FILE_NAMES[key][lang]}`)
  return parseLegal(md)
}
