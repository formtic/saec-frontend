import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/', component: () => import('@/views/public/LoginView.vue'), meta: { isPublic: true}},
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