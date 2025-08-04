import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/public/LoginView.vue";
import adminRoutes from "./adminRoutes.js";
import employeeRoutes from "./employeeRoutes.js";
import reviewerRoutes from "./reviewerRoutes.js";
import { jwtDecode } from "jwt-decode";
import api from "../config/interceptor.js";

const routes = [
    { path: "/", component: LoginView, meta: { isPublic: true } },
    ...adminRoutes,
    ...employeeRoutes,
    ...reviewerRoutes,
    { path: '/:pathMatch(.*)*', redirect: "/" }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('authToken');
    console.log("Token:", token);
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        try {
            const decoded = jwtDecode(token);
            const userRole = `ROLE_${decoded.roles[0]}`;
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp < currentTime) {
                localStorage.removeItem('authToken');
                return next('/');
            }

            if (to.meta.isPublic) {
                if (userRole === 'ROLE_ADMIN') return next('/admin');
                if (userRole === 'ROLE_TEACHER') return next('/reviewer');
                if (userRole === 'ROLE_EMPLOYEE') return next('/employee');
                return next('/');
            }

            if (to.path.startsWith('/admin') && userRole !== 'ROLE_ADMIN') return next('/');
            if (to.path.startsWith('/reviewer') && userRole !== 'ROLE_TEACHER') return next('/');
            if (to.path.startsWith('/employee') && userRole !== 'ROLE_EMPLOYEE') return next('/');
            return next();

        } catch (error) {
            localStorage.removeItem('authToken');
            api.defaults.headers.common['Authorization'] = undefined;
            return next('/');
        }
    }
    if (to.meta.isPublic) {
        return next();
    }
    return next('/');
})

export default router;