import { Fragment } from 'react'
import Footer from '../components/layout/Footer'
import LegalHeader from '../components/layout/LegalHeader'
import { useI18n } from '../i18n'
import { getLegalDoc, type LegalKey } from '../legal/docs'
import { parseInline, type Block } from '../legal/markdown'

// Página legal (Términos / Privacidad). Diseño de lectura larga: sin aurora, vidrio ni animaciones.
export default function Legal({ doc }: { doc: LegalKey }) {
  const { lang, t } = useI18n()
  const { updated, note, sections } = getLegalDoc(doc, lang)
  const title = doc === 'terms' ? t.legal.terms : t.legal.privacy

  return (
    <div className="ac4-legal">
      <LegalHeader />
      <main className="ac4-container pt-[88px]">
        <div className="ac4-legal__hero">
          <span className="ac4-eyebrow">{t.legal.eyebrow}</span>
          <h1>{title}</h1>
          <div className="ac4-legal__meta">
            <span>
              {t.legal.updated} <time>{updated}</time>
            </span>
            {note && <span>{note}</span>}
          </div>
        </div>

        <div className="ac4-legal__layout">
          <nav className="ac4-legal__toc lg:top-[104px]!" aria-label={t.legal.tocLabel}>
            <p>{t.legal.tocLabel}</p>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.title}
              </a>
            ))}
          </nav>
          <article className="ac4-legal__body">
            {sections.map((s) => (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id}>{s.title}</h2>
                {s.blocks.map((b, i) => (
                  <LegalBlock key={i} block={b} newTab={t.newTab} />
                ))}
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function LegalBlock({ block, newTab }: { block: Block; newTab: string }) {
  if (block.type === 'p') return <p>{renderInline(block.text, newTab)}</p>
  return (
    <ul>
      {block.items.map((item, i) => (
        <li key={i}>
          {renderInline(item.text, newTab)}
          {item.children.length > 0 && (
            <ul>
              {item.children.map((c, j) => (
                <li key={j}>{renderInline(c, newTab)}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

function renderInline(text: string, newTab: string) {
  return parseInline(text).map((part, i) => {
    if (part.kind === 'strong') return <strong key={i}>{part.value}</strong>
    if (part.kind === 'link') {
      const external = part.href.startsWith('http')
      return external ? (
        <a key={i} href={part.href} target="_blank" rel="noopener noreferrer">
          {part.value}
          <span className="ac4-sr-only"> {newTab}</span>
        </a>
      ) : (
        <a key={i} href={part.href}>
          {part.value}
        </a>
      )
    }
    return <Fragment key={i}>{part.value}</Fragment>
  })
}
