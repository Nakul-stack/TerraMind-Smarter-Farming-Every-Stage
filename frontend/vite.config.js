import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 4173,
    allowedHosts: ['terramind-smarter-farming-every-stage.onrender.com']
  }
})
