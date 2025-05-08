import { createRouter, createWebHistory } from "vue-router";
import adminRoutes from "@/router/adminRoutes.js";

const routes = [
    { path: '/', component: () => import('@/views/public/LoginView.vue'), meta: { isPublic: true}},
    ...adminRoutes,
    { path: '/:pathMatch(.*)*', redirect: '/'}
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // TODO - Manejo de autenticacion
    next();
});

export default router;