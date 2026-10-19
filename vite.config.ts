import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Загружаем переменные окружения (включая BACKEND_URL)
  const env = loadEnv(mode, process.cwd(), '')
  const backend = env.BACKEND_URL || 'http://localhost:5005'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/support': backend,
        '/orders': backend,
        '/hello': backend,
      },
    },
    preview: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: true,
      proxy: {
        '/support': backend,
        '/orders': backend,
        '/hello': backend,
      },
    },
  }
})