import { StrictMode, createElement } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { CONTENT, ROUTES, type Lang } from './i18n'
import { buildHead, type RouteKey } from './seo'

// Se usa solo al compilar (scripts/prerender.mjs): genera el HTML de cada página.
export { ROUTES }

export function render(lang: Lang, route: RouteKey) {
  return {
    html: renderToString(createElement(StrictMode, null, createElement(App, { lang, route }))),
    head: buildHead(lang, route),
    htmlLang: CONTENT[lang].meta.htmlLang,
  }
}
