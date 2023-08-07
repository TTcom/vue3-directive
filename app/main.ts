
import { createApp } from 'vue/dist/vue.esm-bundler.js'
import directive from '../src/index.js'

import App from './App.vue'

createApp(App).use(directive).mount('#app')
