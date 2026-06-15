// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vue from '@astrojs/vue';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        // Map the exact CommonJS import used by @tresjs/cientos to the ESM build
        'three-custom-shader-material/vanilla/dist/three-custom-shader-material-vanilla.cjs.js':
          'three-custom-shader-material/vanilla/dist/three-custom-shader-material-vanilla.esm.js'
      }
    },
    ssr: {
      noExternal: ['@tresjs/cientos', 'three-custom-shader-material', 'three']
    }
  },

  integrations: [vue()]

});