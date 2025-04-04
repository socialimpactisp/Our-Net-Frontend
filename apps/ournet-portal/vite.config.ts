import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 1313,
  },
  preview: {
    host: true,
    port: 1313,
  },
  plugins: [tsconfigPaths(), vue()],
})
