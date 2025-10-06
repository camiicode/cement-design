import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
  vite: {
    build: {
      cssMinify: false, // 🚫 evita la minificación de colores vía lightningcss
    },
    css: {
      transformer: 'postcss',
    },
  },
});
