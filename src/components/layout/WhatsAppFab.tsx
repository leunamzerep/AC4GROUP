import { useEffect, useState } from 'react'
import { whatsappUrl } from '../../content/site'
import { useI18n } from '../../i18n'
import Icon from '../ui/Icon'

// Botón flotante de WhatsApp. En móvil se oculta cuando un CTA ([data-cta]) entra en la
// franja inferior de la pantalla, para no taparlo. También se oculta con el menú abierto.
export default function WhatsAppFab({ hidden = false }: { hidden?: boolean }) {
  const { t } = useI18n()
  const nearCta = useCtaNearBottom()
  const isHidden = hidden || nearCta
  return (
    <a
      className="ac4-fab"
      href={whatsappUrl(t.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.fab.ariaLabel}
      data-hidden={isHidden}
      aria-hidden={isHidden || undefined}
      tabIndex={isHidden ? -1 : undefined}
    >
      <Icon name="whatsapp" brand size={24} />
      <span className="ac4-fab__label">{t.fab.label}</span>
    </a>
  )
}

function useCtaNearBottom() {
  const [near, setNear] = useState(false)
  useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      if (window.innerWidth >= 768) return setNear(false)
      const h = window.innerHeight
      const hit = Array.from(document.querySelectorAll('[data-cta]')).some((el) => {
        const r = el.getBoundingClientRect()
        return r.bottom > h - 96 && r.top < h
      })
      setNear(hit)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [])
  return near
}
