import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  base: mode === 'production' ? '/resume/' : '/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    chunkSizeWarningLimit: 600, // three.js is one lazy chunk (~130 kB gzip)
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
}))
