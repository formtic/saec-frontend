export default [
  {
    path: "/reviewer",
    component: () => import("@/layouts/ReviewerLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/reviewer/ViewListCourses.vue"),
        name: "courses",
        children: [
          {
            path: "",
            name:'course-list',
            component: ()=>import("@/components/reviewer/ListCourses.vue"),
          },
          {
            path: "exams/:id/:title",
            name: "course-exams",
            component: ()=>import("@/components/reviewer/ListExam.vue"),
          },
        ],
      },
    ],
    meta: {
      requiresAuth: true,
      roles: ["ROLE_REVIEWER"],
    },
  },
];
