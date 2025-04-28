import './assets/main.css'
import dragDirective from './directives/drag'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.directive('drag',dragDirective)

app.mount('#app')
