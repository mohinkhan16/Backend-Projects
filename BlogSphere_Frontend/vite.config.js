import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/JWT': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/blog': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/admin': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
})
