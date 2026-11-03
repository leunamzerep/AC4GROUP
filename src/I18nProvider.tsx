import type { ReactNode } from 'react'
import { CONTENT, I18nContext, type Lang, type PageKey } from './i18n'

export default function I18nProvider({ lang, page, children }: { lang: Lang; page: PageKey; children: ReactNode }) {
  return <I18nContext.Provider value={{ lang, page, t: CONTENT[lang] }}>{children}</I18nContext.Provider>
}
