import { LazyMotion, domAnimation, m, useReducedMotion, type Variants } from 'motion/react'
import type { CSSProperties, ReactNode } from 'react'
import { EASE_OUT, MOTION } from '../../motion'

// Aparición al hacer scroll (una sola vez). Valores en src/motion.ts.
// LazyMotion + "m" carga solo las funciones de animación que usamos (bundle más liviano).

const { duration, distance, stagger, amount } = MOTION.reveal

function useVariants(): Variants {
  const reduce = useReducedMotion()
  return {
    hidden: { opacity: 0, y: reduce ? 0 : distance },
    show: { opacity: 1, y: 0, transition: { duration, ease: EASE_OUT } },
  }
}

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}

/** Un bloque que aparece al entrar en pantalla. */
export default function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const variants = useVariants()
  return (
    <m.div
      data-reveal
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </m.div>
  )
}

/** Contenedor cuyos hijos <RevealItem> aparecen escalonados. */
export function RevealGroup({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'ul' | 'ol' }) {
  const Tag = m[as]
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Tag>
  )
}

/**
 * Hijo de <RevealGroup>. Ojo: Motion escribe `transform` en línea, así que no pongas aquí
 * elementos con transform propio en CSS (hover de tarjetas): envuélvelos.
 */
export function RevealItem({
  children,
  className,
  as = 'div',
  style,
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
  style?: CSSProperties
}) {
  const variants = useVariants()
  const Tag = m[as]
  return (
    <Tag data-reveal className={className} variants={variants} style={style}>
      {children}
    </Tag>
  )
}
