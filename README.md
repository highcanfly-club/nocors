# Simplest noCors proxy for Azure Static Web App

This is a very minimalistic proxy for enabling CORS on non CORS enabled sites.  
Integrate /api in your Azure Static Web App 
Edit /api/proxy/index.ts WHITELIST_REGEX to match your requirement 
```js
const WHITELIST_REGEX=/https:\/\/YOURSITE.com\/.*/
```
or carrefully open to anything 
```js
const WHITELIST_REGEX=/.*/
```
Just prefix your fetch() calls with https://YOURSITE/api/proxy?url=  .  

## Vue 3 + Vite + Typescript + Tailwindcss + Azure functions

This template should help get you started developing with Vue 3 in Vite. The template uses [Vue 3](https://vuejs.org/), [Vite](https://vitejs.dev/), [Tailwind css](https://tailwindcss.com/) .

## Vite

- @ path is defined as ./src
- ~ path is defined as ./node_modules
- npm run dev : launch development environment and serve it to https://localhost:5173
- npm run build : compile, optimize and minify to dist/ directory
- npm run preview : serve dist/ directory to https://localhost:4173

## Howto

- Simply copy this repo with "Use this template" or fork it
- Clone your new repo
- issue "npm i" in your local clone 
- decompress _sensitive_datas with PROJECT_ROOT=`pwd` ./_sensitive_datas/restore_sensitive_datas (or create local dev certificates with npm create-cert)
- issue "npm start"
- browser https://localhost:8788

## Tailwind css

- Tailwind is embedded with my default theme in tailwindcss.config.cjs
- All classes are availables in development environment (usefull for UI debug with devtools)
- Built css is parsed by Purgecss for removing all unused classes, take a look to postcss.config.cjs 

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## License

- [MIT](https://github.com/eltorio/vue-vite-tailwindcss-fontawesome/blob/main/LICENSE.md) for my work
- others are under their own license
