// vite.config.ts
import { defineConfig } from "file:///Users/rlemeill/Development/nocors-1/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/rlemeill/Development/nocors-1/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import vitePluginFontawesomeminify from "file:///Users/rlemeill/Development/nocors-1/node_modules/@highcanfly-club/fontawesome/dist/index.js";
import fs from "fs";
var __vite_injected_original_dirname = "/Users/rlemeill/Development/nocors-1";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vitePluginFontawesomeminify()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "~": path.resolve(__vite_injected_original_dirname, "./node_modules"),
      "\xA7": path.resolve(__vite_injected_original_dirname, "./")
    }
  },
  server: {
    https: fs.existsSync("./localhost-key.pem") ? {
      key: fs.readFileSync("./localhost-key.pem"),
      cert: fs.readFileSync("./localhost-cert.pem")
    } : false
  }
});
export {
  vite_config_default as default
};
/*!
=========================================================
* © 2022 Ronan LE MEILLAT for %CLIENT_NAME%
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- And many others
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcmxlbWVpbGwvRGV2ZWxvcG1lbnQvbm9jb3JzLTFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9ybGVtZWlsbC9EZXZlbG9wbWVudC9ub2NvcnMtMS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvcmxlbWVpbGwvRGV2ZWxvcG1lbnQvbm9jb3JzLTEvdml0ZS5jb25maWcudHNcIjsvKiFcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuKiBcdTAwQTkgMjAyMiBSb25hbiBMRSBNRUlMTEFUIGZvciAlQ0xJRU5UX05BTUUlXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblRoaXMgd2Vic2l0ZSB1c2U6XG4tIFZpdGUsIFZ1ZTMsIEZvbnRBd2Vzb21lIDYsIFRhaWx3aW5kQ3NzIDNcbi0gQW5kIG1hbnkgb3RoZXJzXG4qL1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB2aXRlUGx1Z2luRm9udGF3ZXNvbWVtaW5pZnkgZnJvbSAnQGhpZ2hjYW5mbHktY2x1Yi9mb250YXdlc29tZSdcbmltcG9ydCBmcyBmcm9tICdmcydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICB2aXRlUGx1Z2luRm9udGF3ZXNvbWVtaW5pZnkoKVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICAnfic6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL25vZGVfbW9kdWxlcycpLFxuICAgICAgJ1x1MDBBNyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLycpLFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGh0dHBzOiBmcy5leGlzdHNTeW5jKFwiLi9sb2NhbGhvc3Qta2V5LnBlbVwiKSA/XG4gICAge1xuICAgICAga2V5OiBmcy5yZWFkRmlsZVN5bmMoXCIuL2xvY2FsaG9zdC1rZXkucGVtXCIpLFxuICAgICAgY2VydDogZnMucmVhZEZpbGVTeW5jKFwiLi9sb2NhbGhvc3QtY2VydC5wZW1cIiksXG4gICAgfSA6IGZhbHNlLFxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQVFBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFDakIsT0FBTyxpQ0FBaUM7QUFDeEMsT0FBTyxRQUFRO0FBWmYsSUFBTSxtQ0FBbUM7QUFlekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osNEJBQTRCO0FBQUEsRUFDOUI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNwQyxLQUFLLEtBQUssUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUM3QyxRQUFLLEtBQUssUUFBUSxrQ0FBVyxJQUFJO0FBQUEsSUFDbkM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixPQUFPLEdBQUcsV0FBVyxxQkFBcUIsSUFDMUM7QUFBQSxNQUNFLEtBQUssR0FBRyxhQUFhLHFCQUFxQjtBQUFBLE1BQzFDLE1BQU0sR0FBRyxhQUFhLHNCQUFzQjtBQUFBLElBQzlDLElBQUk7QUFBQSxFQUNOO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
