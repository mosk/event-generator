import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from '@primeuix/themes/aura'
import { Form } from '@primevue/forms'

const pinia = createPinia()
const app = createApp(App)

app
  .use(pinia)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(ToastService)
  .mount('#app')

app.component('Form', Form)
