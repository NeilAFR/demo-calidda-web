import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { initializeAuth } from './services/authAzure'

// 1. Preparamos la seguridad apenas carga la web
initializeAuth().then((response) => {

    // 2. Levantamos Vue
    const app = createApp(App)
    app.use(router)
    app.mount('#app')

    // 3. Si "response" tiene datos, significa que venimos volviendo de Microsoft exitosamente.
    // Lo empujamos directo a la vista de inicio.
    if (response) {
        router.push('/inicio');
    }

}).catch(console.error);