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

router.beforeEach(async (to, from, next) => {
    // Verificamos si en la URL existe el parámetro ?preview=true
    const esModoPreview = to.query.preview === 'true';

    if (to.meta.requiresAuth && !esModoPreview) {
        const user = getActiveAccount();
        if (!user) {
            next('/');
        } else {
            next();
        }
    } else {
        // Si es modo preview, saltamos el guardia de Azure
        next();
    }
});

export default router;