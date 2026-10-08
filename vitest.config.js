import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Next.js autorise le JSX dans les fichiers .js, pas Vite (8+) par défaut :
  // on demande à oxc de parser les .js du projet comme du JSX
  oxc: {
    lang: 'jsx',
    include: /\.jsx?$/,
    exclude: /node_modules/,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './app/test/setup.js',
  },
})
