import {defineConfig} from 'vite'

import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VuetifyAutoImport from 'vite-plugin-vuetify'
import VueRouter from 'unplugin-vue-router/vite'
import {VueRouterAutoImports} from 'unplugin-vue-router'
import Layouts from 'vite-plugin-vue-layouts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routeBlockLang: 'yaml',
      logs: true
    }),
    Layouts(),
    vue(),
    Components({
      dts: true,
      dirs: ['src/components'],
    }),
    VuetifyAutoImport({ autoImport: true }),
    AutoImport({
      dts: true,
      imports: [
        '@vueuse/core',
        'vue',
        VueRouterAutoImports
      ],
      dirs: ['./src/composables']
    })
  ],
  resolve: {
    alias: {
      '@': './src',
    },
  },
})
