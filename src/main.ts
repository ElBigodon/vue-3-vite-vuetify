import {createApp} from 'vue';
import App from './App.vue';

import {createRouter, createWebHistory} from 'vue-router/auto';

import {setupLayouts} from 'virtual:generated-layouts';

// Vuetify
import 'vuetify/styles';
import {createVuetify} from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { pt, en } from 'vuetify/locale';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Redefinindo estilização
import '@unocss/reset/normalize.css';
// Aplicando estilização dos vuetify para todos componentes, Ex: div, span ...
import 'vuetify/dist/vuetify.min.css';
// Aplicando font
import './assets/main.css';

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    fallback: 'en',
    locale: 'pt-br',
    messages: {
      pt,
      en
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

const router = createRouter({
  history: createWebHistory(),
  extendRoutes: setupLayouts
});

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app');