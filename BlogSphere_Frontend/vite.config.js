import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/JWT': {
        target: 'https://backend-projects-2-6qxi.onrender.com',
        changeOrigin: true,
        secure: false,
      },
      '/blog': {
        target: 'https://backend-projects-2-6qxi.onrender.com',
        changeOrigin: true,
        secure: false,
      },
      '/admin': {
        target: 'https://backend-projects-2-6qxi.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
