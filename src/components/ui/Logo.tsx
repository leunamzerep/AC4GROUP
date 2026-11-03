import { GROUP, MARK } from './logoPaths'

type Props = {
  /** primary = AC4 + GROUP apilado · horizontal = en línea · icon = solo AC4 */
  variant?: 'primary' | 'horizontal' | 'icon'
  height?: number
  title?: string
  className?: string
}

const VIEWBOX = {
  icon: '-9 -8.8 785.2 385.5',
  horizontal: '-9 -8.8 1460.2 385.5',
  primary: '-9 -8.8 785.2 508.6',
}

// Logo AC4 en SVG: marca blanca y "GROUP" dorado (nunca plateado).
export default function Logo({ variant = 'primary', height = 40, title = 'AC4 Group', className }: Props) {
  const vb = VIEWBOX[variant]
  const [, , w, h] = vb.split(' ').map(Number)
  return (
    <svg viewBox={vb} height={height} width={(height * w) / h} role="img" aria-label={title} className={`block flex-none ${className ?? ''}`}>
      <title>{title}</title>
      <path fill="#FFFFFF" fillRule="evenodd" d={MARK} />
      {variant === 'horizontal' && <path fill="#D9A948" fillRule="evenodd" transform="translate(768.2 -261.6)" d={GROUP} />}
      {variant === 'primary' && <path fill="#D9A948" fillRule="evenodd" d={GROUP} />}
    </svg>
  )
}
