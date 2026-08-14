// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vue from '@astrojs/vue';

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
    },
    optimizeDeps: {
      force: true,
      include: ['three', '@tresjs/core', '@tresjs/cientos']
    }
  },

  integrations: [vue()]

});
