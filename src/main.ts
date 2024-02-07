import {createApp} from 'vue'
import App from './App.vue'

import '@unocss/reset/normalize.css'

import {createRouter, createWebHistory} from 'vue-router/auto'

import {setupLayouts} from 'virtual:generated-layouts'

// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    fallback: 'en',
    locale: 'pt-br'
  }
})

const router = createRouter({
  history: createWebHistory(),
  extendRoutes: setupLayouts
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')