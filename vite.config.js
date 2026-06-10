import { defineConfig } from 'vite'

export default defineConfig({
  // Base path for GitHub Pages (user site serves from root)
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
