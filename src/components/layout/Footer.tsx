import { SITE, whatsappUrl } from '../../content/site'
import { pagePath, useI18n } from '../../i18n'
import Icon from '../ui/Icon'
import type { BrandName, LucideName } from '../ui/iconData'
import Logo from '../ui/Logo'
import Slogan from '../ui/Slogan'

export default function Footer() {
  const { lang, page, t } = useI18n()
  const f = t.footer
  const sectionHref = (id: string) => (page === 'home' ? `#${id}` : `${pagePath('home', lang)}#${id}`)

  const contacts: { href: string; label: string; icon: LucideName | BrandName; brand?: boolean; external?: boolean }[] = [
    { href: whatsappUrl(t.whatsappMessage), label: f.whatsapp, icon: 'whatsapp', brand: true, external: true },
    { href: `mailto:${SITE.email}`, label: f.email, icon: 'mail' },
    { href: SITE.instagram, label: f.instagram, icon: 'instagram', brand: true, external: true },
  ]
  if (SITE.facebook) contacts.push({ href: SITE.facebook, label: f.facebook, icon: 'facebook', brand: true, external: true })

  return (
    // Espacio extra abajo para que el botón flotante de WhatsApp no tape el crédito.
    <footer className="ac4-footer pb-24">
      <div className="ac4-container">
        <div className="ac4-footer__grid">
          <div className="ac4-footer__about">
            <Logo variant="horizontal" height={30} />
            <Slogan />
            <p className="text-sm leading-relaxed">{f.about}</p>
          </div>

          <nav aria-label={f.navLabel}>
            <p className="ac4-footer__title">{f.navTitle}</p>
            <ul className="ac4-footer__list">
              {t.nav.items.map((item) => (
                <li key={item.id}>
                  <a href={sectionHref(item.id)}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="ac4-footer__title">{f.contactTitle}</p>
            <ul className="flex gap-2.5">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    aria-label={c.external ? `${c.label} ${t.newTab}` : c.label}
                    className="ac4-icon-btn ac4-icon-btn--muted"
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Icon name={c.icon} brand={c.brand} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="ac4-footer__title">{f.legalTitle}</p>
            <ul className="ac4-footer__list">
              <li>
                <a href={pagePath('terms', lang)}>{f.terms}</a>
              </li>
              <li>
                <a href={pagePath('privacy', lang)}>{f.privacy}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="ac4-footer__bottom">
          <span>{f.copyright}</span>
          <span>
            {f.credit}{' '}
            <a href={SITE.credit.url} target="_blank" rel="noopener noreferrer" className="text-text-secondary">
              {SITE.credit.name}
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
