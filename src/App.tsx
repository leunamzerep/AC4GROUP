import I18nProvider from './I18nProvider'
import type { Lang, PageKey } from './i18n'
import Landing from './pages/Landing'
import Legal from './pages/Legal'

// Una página por URL e idioma. PENDIENTE (fase 8): prerender de cada ruta.
export default function App({ lang, page }: { lang: Lang; page: PageKey }) {
  return (
    <I18nProvider lang={lang} page={page}>
      {page === 'home' ? <Landing /> : <Legal doc={page} />}
    </I18nProvider>
  )
}
