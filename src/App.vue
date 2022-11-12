<!--
=========================================================
* © 2022 Ronan LE MEILLAT for SCTG Développement
=========================================================
This website use:
- Vite, Vue3, TailwindCss 3
- And many others
-->
<template>
  <router-view />
</template>
<script setup lang="ts">
import { $require } from '@/utilities/viteHelper';

const iconLink = document.createElement("link");
iconLink.setAttribute("type", "image/svg+xml");
iconLink.setAttribute("rel", "icon");
iconLink.setAttribute("href", $require("@/assets/LogoSCTGText.svg"));
document.head.appendChild(iconLink);
</script>