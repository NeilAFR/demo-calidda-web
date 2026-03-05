import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { initializeAuth } from './services/authAzure'
import { ContentfulLivePreview } from '@contentful/live-preview'

// Inicialización oficial del SDK
ContentfulLivePreview.init({
    locale: 'en-US',
    enableLiveUpdates: true,
    enableInspectorMode: true
});

initializeAuth().then(() => {
    const app = createApp(App)
    app.use(router)
    app.mount('#app')
}).catch(console.error);