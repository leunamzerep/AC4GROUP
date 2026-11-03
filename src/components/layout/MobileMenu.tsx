import { useEffect, useRef } from 'react'
import { whatsappUrl } from '../../content/site'
import { useI18n } from '../../i18n'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'
import LanguageSwitch from './LanguageSwitch'

type Props = { onClose: () => void; sectionHref: (id: string) => string }

// Menú móvil a pantalla completa. Accesible: Esc cierra, el foco queda atrapado dentro
// y al cerrar vuelve al botón que lo abrió (lo maneja el Header).
export default function MobileMenu({ onClose, sectionHref }: Props) {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = ref.current
    if (!panel) return
    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
    focusables()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    // Bloquea el scroll de la página mientras el menú está abierto.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div
      ref={ref}
      id="menu-movil"
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.menuLabel}
      className="ac4-mobile-menu fixed inset-0 z-80 flex flex-col overflow-y-auto px-[clamp(12px,2vw,24px)] pt-3 pb-8"
    >
      <div className="flex h-16 items-center justify-between rounded-[20px] border border-[rgba(195,202,217,.16)] bg-[rgba(14,20,52,.5)] pr-2.5 pl-5">
        <Logo variant="horizontal" height={24} />
        <button type="button" className="ac4-icon-btn bg-transparent" aria-label={t.nav.closeMenu} onClick={onClose}>
          <Icon name="x" size={22} />
        </button>
      </div>

      <nav aria-label={t.nav.mobileNavLabel} className="mt-6 flex flex-col px-2">
        {t.nav.items.map((item, i) => (
          <a key={item.id} href={sectionHref(item.id)} onClick={onClose} className="ac4-mobile-menu__link">
            <span>{String(i + 1).padStart(2, '0')}</span>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-5 px-2 pt-8">
        <div className="flex items-center justify-between gap-3">
          <span className="ac4-small">{t.nav.language}</span>
          <LanguageSwitch />
        </div>
        <Button href={whatsappUrl(t.whatsappMessage)} target="_blank" size="lg" block shimmer icon="whatsapp">
          {t.nav.menuCta}
        </Button>
      </div>
    </div>
  )
}
