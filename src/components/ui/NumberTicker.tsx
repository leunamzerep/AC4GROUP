import { useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { MOTION } from '../../motion'

type Props = { value: number; prefix?: string; locale: string; className?: string }

// easeOut cúbico (equivalente visual a la curva EASE_OUT de motion.ts).
const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3)

// Cuenta de 0 al valor una sola vez, cuando entra en pantalla.
// El HTML prerenderizado ya trae el valor final (SEO / sin JavaScript);
// con "reducir movimiento" se queda en el valor final sin animar.
// Usa requestAnimationFrame en vez de animate() de Motion: pesa mucho menos en el bundle.
export default function NumberTicker({ value, prefix = '', locale, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = useReducedMotion()
  const [n, setN] = useState(value)
  const started = useRef(false)

  // Antes de que se vea, preparamos el contador en 0 (está fuera de pantalla, no se nota).
  useEffect(() => {
    if (!reduce && !started.current && !inView) setN(0)
  }, [reduce, inView])

  useEffect(() => {
    if (!inView || reduce || started.current) return
    started.current = true
    const ms = MOTION.tickerDuration * 1000
    const frame = { id: 0 }
    const t0 = performance.now()
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / ms)
      setN(value * easeOutCubic(p))
      if (p < 1) frame.id = requestAnimationFrame(step)
    }
    frame.id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame.id)
  }, [inView, reduce, value])

  const fmt = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 })
  return (
    <span ref={ref} className={`ac4-ticker ${className}`}>
      <span aria-hidden="true">
        {prefix}
        {fmt.format(Math.round(n))}
      </span>
      <span className="ac4-sr-only">
        {prefix}
        {fmt.format(value)}
      </span>
    </span>
  )
}
