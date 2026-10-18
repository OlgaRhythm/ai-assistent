import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/support': 'http://localhost:5005',
      '/orders': 'http://localhost:5005',
      '/hello': 'http://localhost:5005',
    },
  },
})
