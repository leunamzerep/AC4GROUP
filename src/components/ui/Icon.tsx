import type { CSSProperties } from 'react'
import { BRANDS, LUCIDE, type BrandName, type LucideName } from './iconData'

type Props = {
  name: LucideName | BrandName
  size?: number
  strokeWidth?: number
  /** Fuerza el glifo de marca (Simple Icons) cuando existe también en Lucide (instagram, facebook). */
  brand?: boolean
  /** Si se pasa, el ícono se anuncia a lectores de pantalla; si no, es decorativo. */
  title?: string
  className?: string
  style?: CSSProperties
}

// Íconos SVG en línea: sin CDN ni fuentes de íconos.
export default function Icon({ name, size = 20, strokeWidth = 1.75, brand = false, title, className, style }: Props) {
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true }
  const useBrand = (brand || !(name in LUCIDE)) && name in BRANDS

  if (useBrand) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} style={style} {...a11y}>
        <path d={BRANDS[name as BrandName]} />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      {...a11y}
      dangerouslySetInnerHTML={{ __html: LUCIDE[name as LucideName] ?? '' }}
    />
  )
}
