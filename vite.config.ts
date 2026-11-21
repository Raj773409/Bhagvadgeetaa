import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwind()],
  // Allow Render's public hostname when serving the build with `vite preview`
  preview: { allowedHosts: ['.onrender.com'] },
})
