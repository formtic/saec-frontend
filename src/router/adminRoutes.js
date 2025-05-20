export default [
  {
    path: "/admin",
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/admin/AdminDashboard.vue"),
      },
      {
        path: "courses",
        component: () => import("@/views/evaluator/ViewListCourses.vue"),
        children: [
          {
            path:"",
            name:"course-list",
            component: () => import("@/components/evaluator/ListCourses.vue")
          },
          {
            path: "exams/:id/:title",
            name: "course-exams",
            component: () => import("@/views/evaluator/ListExams.vue"),
          },
        ],
      },
    ],
  },
];
