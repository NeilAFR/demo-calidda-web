import { createRouter, createWebHistory } from 'vue-router';
import { getActiveAccount } from '../services/authAzure';
import LoginView from '../views/LoginView.vue';
import Inicio from '../views/Inicio.vue';
import DetalleBeneficioView from '../views/DetalleBeneficioView.vue'; // <-- Importamos la nueva vista

const routes = [
    { path: '/', component: LoginView },
    {
        path: '/inicio',
        component: Inicio,
        meta: { requiresAuth: true }
    },
    {
        // Los dos puntos ":" indican que esa parte de la URL es dinámica (una variable)
        path: '/beneficio/:id',
        component: DetalleBeneficioView,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// EL GUARDIA DE SEGURIDAD BLINDADO
router.beforeEach((to, from, next) => {
    // 1. Buscamos nuestra "llave secreta" en la URL
    const esModoPreview = to.query.preview === 'true';

    // 2. Si la ruta es privada (Inicio o Detalle)
    if (to.meta.requiresAuth) {

        // Si tiene la llave de Contentful, ¡déjalo pasar sin preguntar!
        if (esModoPreview) {
            next();
        } else {
            // Si no tiene la llave, verificamos si hay sesión en Azure
            const user = getActiveAccount();
            if (!user) {
                next('/'); // Pa' fuera, al login
            } else {
                next(); // Tiene sesión, adelante
            }
        }

    } else {
        // Si es una ruta pública (como el mismo Login), déjalo pasar
        next();
    }
});

export default router;