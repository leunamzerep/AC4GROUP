// ─────────────────────────────────────────────────────────────────────────────
// Animaciones del sitio: TODAS las duraciones y curvas se ajustan aquí.
// Nivel "medio": fluidas y pausadas, sin volverse lentas.
// Con "reducir movimiento" activo en el sistema, no hay desplazamientos:
// solo cambios de opacidad (y las animaciones en bucle se apagan).
// ─────────────────────────────────────────────────────────────────────────────

/** Curva principal: easeOut cúbico suave. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export const MOTION = {
  /** Aparición al hacer scroll. */
  reveal: {
    duration: 0.8, // segundos
    distance: 20, // px que sube el elemento al aparecer
    stagger: 0.1, // segundos entre elementos de un mismo grupo
    /** Qué parte del elemento debe verse para empezar (0–1). */
    amount: 0.2,
  },
  /** Hover de tarjetas y botones (ms). */
  hoverMs: 350,
  /** Cambios rápidos: color, subrayados (ms). */
  fastMs: 200,
  /** Number Ticker del caso real: una sola vez al entrar en pantalla (s). */
  tickerDuration: 1.8,
  /** Menú móvil: aparición/desaparición (s). */
  menuDuration: 0.35,
  /** Brillo del CTA principal: un ciclo completo (ms). */
  shimmerMs: 3600,
  /** Haz de luz del proceso: recorrido continuo (ms). */
  beamMs: 6500,
  /** Desfase del haz entre un paso y el siguiente (ms). */
  beamStaggerMs: 450,
  /** Aurora de fondo (hero y contacto): un ciclo (s). */
  auroraSeconds: 48,
  /** Pulso del punto "en vivo" del tablero (s). */
  pulseSeconds: 3,
} as const

/**
 * Variables CSS que usan los estilos del design system (hover, shimmer, beam, aurora).
 * Se inyectan una vez en la página desde <MotionStyles />, así este archivo es la única fuente.
 */
export const motionCssVars = () => `:root{
--dur-fast:${MOTION.fastMs}ms;
--dur-base:${MOTION.hoverMs}ms;
--dur-shimmer:${MOTION.shimmerMs}ms;
--dur-beam:${MOTION.beamMs}ms;
--beam-stagger:${MOTION.beamStaggerMs}ms;
--dur-aurora:${MOTION.auroraSeconds}s;
--dur-pulse:${MOTION.pulseSeconds}s;
--dur-reveal:${MOTION.reveal.duration * 1000}ms;
--reveal-distance:${MOTION.reveal.distance}px;
--ease-out:cubic-bezier(${EASE_OUT.join(',')});
}
@media (prefers-reduced-motion:reduce){:root{--dur-fast:0ms;--dur-base:0ms;--dur-reveal:0ms;--reveal-distance:0px}}`
