// Imágenes del sitio. Vite les agrega un hash al compilar (caché segura).
import wave1200 from '../assets/img/wave-blue-1200.webp'
import wave2400 from '../assets/img/wave-blue-2400.webp'

/** Onda azul de marca (decorativa). Tamaños reales: 1200×520 y 2400×1040. */
export const WAVE = {
  src: wave1200,
  srcSet: `${wave1200} 1200w, ${wave2400} 2400w`,
  width: 1200,
  height: 520,
}
