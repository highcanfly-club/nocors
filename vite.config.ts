/*!
=========================================================
* © 2022 Ronan LE MEILLAT for SCTG Développement
=========================================================
This website use:
- Vite, Vue3, TailwindCss 3
- And many others
*/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './node_modules'),
      '§': path.resolve(__dirname, './'),
    },
  },
  server: {
    https: fs.existsSync("./localhost-key.pem") ?
    {
      key: fs.readFileSync("./localhost-key.pem"),
      cert: fs.readFileSync("./localhost-cert.pem"),
    } : false,
  }
})
