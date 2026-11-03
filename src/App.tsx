import I18nProvider from './I18nProvider'
import type { Lang } from './i18n'
import Landing from './pages/Landing'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'
import type { RouteKey } from './seo'

// Una página por URL e idioma. Cada ruta se prerenderiza a HTML en scripts/prerender.mjs.
export default function App({ lang, route }: { lang: Lang; route: RouteKey }) {
  return (
    <I18nProvider lang={lang} page={route === 'notFound' ? 'home' : route}>
      {route === 'home' ? <Landing /> : route === 'notFound' ? <NotFound /> : <Legal doc={route} />}
    </I18nProvider>
  )
}
