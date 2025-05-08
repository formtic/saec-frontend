export default [
    {
        path: "/admin",
        component: () => import("@/layouts/AdminLayout.vue"),
        children: [
            {
                path: "",
                component: () => import("@/views/admin/AdminDashboard.vue")
            }
        ]
    }
]