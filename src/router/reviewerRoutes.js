import TeacherCoursesDashboardView from "../views/teacher/course/TeacherCoursesDashboardView.vue";
import TeacherLayout from "../views/teacher/layout/TeacherLayout.vue";
export default [
  {
    path: "/teacher",
    component: TeacherLayout,
    children: [
      {
        path: 'courses',
        component: TeacherCoursesDashboardView
      }
    ],
    meta: {
      requiresAuth: true,
      roles: ["ROLE_TEACHER"],
    },
  },
];
