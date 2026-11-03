import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // El sitio vive en https://leunamzerep.github.io/AC4GROUP/
  base: '/AC4GROUP/',
  plugins: [react(), tailwindcss()],
})
