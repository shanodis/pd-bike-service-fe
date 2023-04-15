import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const sassNodeModuleResolve: any = {
  find: /^~.+/,
  replacement: (val: any) => val.replace(/^~/, ''),
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: [sassNodeModuleResolve],
  },
})
