import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ini untuk configure ketika deploy diubah menjadi domainnya nanti
  server : {
    proxy : {
      // apapun yang /api akan menggunakan awalan
      "/api" : {
        target  : "http://localhost:5000",
        changeOrigin : true
      },
      "/v1" : {
        target  : "http://localhost:80",
        changeOrigin : true
      }
    }
  }
})
