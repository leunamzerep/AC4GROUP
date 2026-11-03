import { AnimatePresence } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { whatsappUrl } from '../../content/site'
import { pagePath, useI18n } from '../../i18n'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'
import LanguageSwitch from './LanguageSwitch'
import MobileMenu from './MobileMenu'

type Props = {
  menuOpen: boolean
  onMenuChange: (open: boolean) => void
}

// Header flotante con liquid glass. Desktop (≥1024px): navegación + idioma + CTA.
// Móvil/tablet: CTA corto + botón de menú.
export default function Header({ menuOpen, onMenuChange }: Props) {
  const { lang, page, t } = useI18n()
  const onLanding = page === 'home'
  const active = useActiveSection(onLanding ? t.nav.items.map((i) => i.id) : [])
  const toggleRef = useRef<HTMLButtonElement>(null)
  const wa = whatsappUrl(t.whatsappMessage)

  // En la landing las anclas son locales; en otras páginas apuntan a la landing.
  const sectionHref = useCallback(
    (id: string) => (onLanding ? `#${id}` : `${pagePath('home', lang)}#${id}`),
    [onLanding, lang],
  )

  const closeMenu = useCallback(() => {
    onMenuChange(false)
    toggleRef.current?.focus()
  }, [onMenuChange])

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 px-[clamp(12px,2vw,24px)]">
        <div className="ac4-header-glass mx-auto flex h-16 max-w-[1280px] items-center gap-4 rounded-[20px] pr-2.5 pl-5">
          <a href={onLanding ? '#inicio' : pagePath('home', lang)} aria-label={t.nav.homeLabel} className="flex flex-none items-center text-white">
            <Logo variant="horizontal" height={24} />
          </a>

          <nav aria-label={t.nav.label} className="mx-auto hidden items-center gap-0.5 lg:flex">
            {t.nav.items.map((item) => (
              <a key={item.id} className="ac4-nav__link" href={sectionHref(item.id)} aria-current={active === item.id ? 'true' : undefined}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden flex-none items-center gap-3 lg:flex">
            <LanguageSwitch />
            <Button href={wa} target="_blank" size="sm" icon="whatsapp">
              {t.nav.cta}
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <Button href={wa} target="_blank" size="sm" icon="whatsapp">
              {t.nav.ctaShort}
            </Button>
            <button
              ref={toggleRef}
              type="button"
              className="ac4-icon-btn"
              aria-label={t.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              onClick={() => onMenuChange(true)}
            >
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>{menuOpen && <MobileMenu onClose={closeMenu} sectionHref={sectionHref} />}</AnimatePresence>
    </>
  )
}

/** Devuelve el id de la sección que ocupa el centro de la pantalla (para subrayar el enlace activo). */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')
  useEffect(() => {
    if (!key) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    key.split(',').forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [key])
  return active
}
