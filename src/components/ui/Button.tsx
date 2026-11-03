import type { AnchorHTMLAttributes, ReactNode } from 'react'
import Icon from './Icon'
import type { BrandName, LucideName } from './iconData'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  /** Brillo animado: solo en el CTA principal (máx. uno por pantalla). */
  shimmer?: boolean
  block?: boolean
  icon?: LucideName | BrandName
  iconRight?: LucideName
  children: ReactNode
}

// Todos los botones del sitio son enlaces (WhatsApp, anclas, correo, redes).
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  shimmer = false,
  block = false,
  icon,
  iconRight,
  className = '',
  children,
  ...rest
}: Props) {
  const cls = [
    'ac4-btn',
    `ac4-btn--${variant}`,
    size !== 'md' && `ac4-btn--${size}`,
    shimmer && variant === 'primary' && 'ac4-btn--shimmer',
    block && 'ac4-btn--block',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const s = size === 'sm' ? 16 : 18
  const external = rest.target === '_blank'
  return (
    <a href={href} className={cls} rel={external ? 'noopener noreferrer' : undefined} {...rest}>
      {icon && <Icon name={icon} size={s} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={s} />}
    </a>
  )
}
