import { Fragment } from 'react'
import { useI18n } from '../../i18n'

// "Estrategia · Datos · Resultados" — orden fijo, la última palabra en dorado.
export default function Slogan({ className = '' }: { className?: string }) {
  const items = useI18n().t.slogan
  return (
    <span className={`ac4-slogan ${className}`}>
      {items.map((word, i) => (
        <Fragment key={word}>
          {i > 0 && <span className="ac4-slogan__dot" aria-hidden="true" />}
          <span className={i === items.length - 1 ? 'ac4-slogan__last' : undefined}>{word}</span>
        </Fragment>
      ))}
    </span>
  )
}
