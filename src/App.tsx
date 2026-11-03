import I18nProvider from './I18nProvider'
import type { Lang, PageKey } from './i18n'
import Landing from './pages/Landing'

// Una página por URL e idioma. PENDIENTE (fase 7): páginas legales; (fase 8): prerender.
export default function App({ lang, page }: { lang: Lang; page: PageKey }) {
  return (
    <I18nProvider lang={lang} page={page}>
      <Landing />
    </I18nProvider>
  )
}
