import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VuetifyAutoImport from 'vite-plugin-vuetify'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Layouts from 'vite-plugin-vue-layouts';
import removeConsoles from 'vite-plugin-remove-console';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => ({
  plugins: [
    VueRouter({
      routeBlockLang: 'yaml',
      logs: true,
      dts: '.cache/typed-router.d.ts'
    }),
    Layouts(),
    vue(),
    Components({
      dts: '.cache/auto-import-components.d.ts',
      dirs: ['src/components'],
    }),
    VuetifyAutoImport({ autoImport: true }),
    AutoImport({
      dts: '.cache/auto-import.d.ts',
      imports: [
        '@vueuse/core',
        'vue',
        VueRouterAutoImports,
        {
          from: '@vueuse/integrations/useAxios',
          imports: ['useAxios']
        }
      ],
      dirs: ['./src/composables', './src/configs']
    }),
    // Remove todos os console.log() existentes nos componentes. (Não remove .error, .warn e .info)
    removeConsoles(),
  ],
  resolve: {
    alias: {
      '@': './src',
    },
  },
  define: {
    'process.env': loadEnv(mode, process.cwd(), '_G')
  }
}
))
