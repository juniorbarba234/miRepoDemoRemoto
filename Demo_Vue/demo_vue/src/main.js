import './assets/main.css' /* Asegúrate de que este archivo no tenga fondos blancos que pisen el nuevo diseño */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' /* Si no estás usando Vue Router, puedes quitar esta línea y app.use(router) */

const app = createApp(App)

app.use(router)

app.mount('#app')