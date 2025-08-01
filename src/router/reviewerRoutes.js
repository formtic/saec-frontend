import TeacherCourseDetailsView from "../views/teacher/course/TeacherCourseDetailsView.vue";
import TeacherCoursesDashboardView from "../views/teacher/course/TeacherCoursesDashboardView.vue";
import TeacherLayout from "../views/teacher/layout/TeacherLayout.vue";
import TeacherDashboardView from "../views/teacher/TeacherDashboardView.vue";
export default [
  {
    path: "/teacher",
    component: TeacherLayout,
    children: [
      {
        path: '',
        component: TeacherDashboardView
      },
      {
        path: 'courses',
        component: TeacherCoursesDashboardView
      },
      {
        path: 'courses/details/:id',
        component: TeacherCourseDetailsView,
        props: true
      }
    ],
    meta: {
      requiresAuth: true,
      roles: ["ROLE_TEACHER"],
    },
  },
];
