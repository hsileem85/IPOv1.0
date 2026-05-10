import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/IPOv1.0/",   <--- هذا هو السطر الناقص!
  plugins: [react()],
})
