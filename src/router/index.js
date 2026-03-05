import { createRouter, createWebHistory } from 'vue-router';
import { getActiveAccount } from '../services/authAzure';
import LoginView from '../views/LoginView.vue';
import Inicio from '../views/Inicio.vue';

const routes = [
    { path: '/', component: LoginView },
    {
        path: '/inicio',
        component: Inicio,
        meta: { requiresAuth: true } // Marcamos que esta ruta es protegida
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Guardia de seguridad
router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        const user = await getActiveAccount();
        if (!user) {
            next('/'); // No hay usuario, va al login
        } else {
            next(); // Adelante, pase usted
        }
    } else {
        next();
    }
});

export default router;