import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/Estate-Agent-Web-App/',
  server: {
    port: 3000,
    open: true,
  },
})
