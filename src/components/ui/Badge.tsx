import type { ReactNode } from 'react'
import Icon from './Icon'
import type { LucideName } from './iconData'

type Props = {
  variant?: 'gold' | 'gold-outline' | 'blue' | 'neutral' | 'light'
  icon?: LucideName
  className?: string
  children: ReactNode
}

export default function Badge({ variant = 'neutral', icon, className = '', children }: Props) {
  return (
    <span className={`ac4-badge ac4-badge--${variant} ${className}`}>
      {icon && <Icon name={icon} size={12} strokeWidth={2.5} />}
      {children}
    </span>
  )
}
