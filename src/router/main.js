import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/public/LoginView.vue";
import adminRoutes from "./adminRoutes.js";
import employeeRoutes from "./employeeRoutes.js";
import reviewerRoutes from "./reviewerRoutes.js";

const routes = [
    { path: "/", component: LoginView, meta: { isPublic: true} },
    ...adminRoutes,
    ...employeeRoutes,
    ...reviewerRoutes,
    { path: '/:pathMatch(.*)*', redirect: "/"}
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    //TODO - Manejar autenticación
    next();
})

export default router;