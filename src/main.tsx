import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { CONTENT, routeFromPath } from './i18n'

const { lang, page } = routeFromPath(window.location.pathname)
document.documentElement.lang = CONTENT[lang].meta.htmlLang

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App lang={lang} page={page} />
  </StrictMode>,
)
