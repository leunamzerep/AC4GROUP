import I18nProvider from './I18nProvider'
import Landing from './pages/Landing'

// PENDIENTE (fases 6-8): rutas por idioma y páginas legales con prerender.
export default function App() {
  return (
    <I18nProvider lang="es" page="home">
      <Landing />
    </I18nProvider>
  )
}
