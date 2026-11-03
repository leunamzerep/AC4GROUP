import { whatsappUrl } from '../../content/site'
import { pagePath, useI18n } from '../../i18n'
import Button from '../ui/Button'
import Logo from '../ui/Logo'
import LanguageSwitch from './LanguageSwitch'

// Header de las páginas legales: logo, "Volver al inicio", idioma y (en desktop) CTA.
export default function LegalHeader() {
  const { lang, t } = useI18n()
  const home = pagePath('home', lang)
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-[clamp(12px,2vw,24px)]">
      <div className="ac4-header-glass mx-auto flex h-16 max-w-[1280px] items-center gap-4 rounded-[20px] pr-2.5 pl-5">
        <a href={home} aria-label={t.nav.homeLabel} className="flex flex-none items-center text-white">
          <Logo variant="horizontal" height={24} />
        </a>
        <a
          href={home}
          className="inline-flex h-11 items-center gap-2 rounded-[10px] px-3 text-sm font-bold whitespace-nowrap text-text-secondary no-underline hover:bg-white/5 hover:text-white"
        >
          <span aria-hidden="true">←</span>
          <span className="hidden min-[420px]:inline">{t.legal.back}</span>
          <span className="min-[420px]:hidden">{t.legal.backShort}</span>
        </a>
        <div className="ml-auto flex flex-none items-center gap-3">
          <LanguageSwitch />
          <Button href={whatsappUrl(t.whatsappMessage)} target="_blank" size="sm" icon="whatsapp" className="hidden lg:inline-flex">
            {t.nav.cta}
          </Button>
        </div>
      </div>
    </header>
  )
}
