import { pagePath, saveLangPreference, useI18n, type Lang } from '../../i18n'

const LANGS: Lang[] = ['es', 'en']

// Selector ES / EN. Cada idioma es una URL propia (mejor para SEO que cambiar el texto con JS).
export default function LanguageSwitch() {
  const { lang, page, t } = useI18n()
  return (
    <nav className="ac4-lang" aria-label={t.languageSwitch.label}>
      {LANGS.map((code) => (
        <a
          key={code}
          href={pagePath(page, code)}
          hrefLang={code}
          lang={code}
          className="ac4-lang__opt"
          aria-current={code === lang ? 'page' : undefined}
          aria-label={t.languageSwitch[code]}
          onClick={() => saveLangPreference(code)}
        >
          {code.toUpperCase()}
        </a>
      ))}
    </nav>
  )
}
