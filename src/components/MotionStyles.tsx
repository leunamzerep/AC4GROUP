import { motionCssVars } from '../motion'

// Publica las duraciones de src/motion.ts como variables CSS (ver ese archivo).
export default function MotionStyles() {
  return <style>{motionCssVars()}</style>
}
