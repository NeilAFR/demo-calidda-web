import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { initializeAuth } from './services/authAzure' // Importamos la nueva función

// Primero inicializamos la seguridad...
initializeAuth().then(() => {
    // ...y solo cuando termina, levantamos la interfaz de Vue
    const app = createApp(App)
    app.use(router)
    app.mount('#app')
}).catch(console.error);