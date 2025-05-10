export default [
    {
        path: "/admin",
        component: () => import("@/layouts/AdminLayout.vue"),
        children: [
            {
                path: "",
                component: () => import("@/views/admin/AdminDashboard.vue")
            },
            {
                path: "courses",
                component:()=> import("@/views/evaluator/ListCourses.vue")
            }
        ]
    }
]