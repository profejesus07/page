import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // El repositorio se publica en GitHub Pages como proyecto (github.com/<user>/page),
  // por eso el build necesita este prefijo; en desarrollo se sirve en la raíz.
  base: command === 'build' ? '/page/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5183,
    strictPort: true,
  },
}))
