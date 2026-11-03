import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { CONTENT, routeFromPath, type Lang } from './i18n'
import type { RouteKey } from './seo'

const root = document.getElementById('root')!
// En producción cada HTML ya viene prerenderizado y trae su ruta en data-*.
// En desarrollo (npm run dev) la ruta se deduce de la URL.
const fromUrl = routeFromPath(window.location.pathname)
const lang = (root.dataset.lang as Lang) ?? fromUrl.lang
const route = (root.dataset.route as RouteKey) ?? fromUrl.page
const app = (
  <StrictMode>
    <App lang={lang} route={route} />
  </StrictMode>
)

if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  document.documentElement.lang = CONTENT[lang].meta.htmlLang
  createRoot(root).render(app)
}
