import { createApp } from 'vue'
import './style.css' // ¡Esta línea es la clave para que cargue Tailwind!
import App from './App.vue'

createApp(App).use(router).mount('#app')