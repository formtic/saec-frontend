import EmployeeLayout from "../components/employee/EmployeeLayout.vue";
import EmployeeDashboardView from "../views/employee/EmployeeDashboardView.vue";
import ProfileView from "../views/admin/ProfileView.vue";
import CourseContentView from "../views/employee/CourseContentView.vue";
import MyAssigmentCourses from "../views/employee/MyAssigmentCourses.vue";
import ExamView from "../views/employee/ExamView.vue";
import SectionView from "../views/employee/SectionView.vue";

export default [
  {
    path: "/employee",
    component: EmployeeLayout,
    children: [
      {
        path: "",
        component: EmployeeDashboardView,
      },
      {
        path: "profile",
        component: ProfileView
      },
      {
        path: "courses",
        component: MyAssigmentCourses,
      },
      {
        path: "courses/course-info/:courseId",  
        component: CourseContentView,
      },
      {
        path: "courses/course-info/:courseId/section/:sectionId",  
        component: SectionView,
      },
      {
        path: "courses/course-info/:courseId/exam",  
        component: ExamView,
      },


    ],
    meta: {
      requiresAuth: true,
      roles: ["ROLE_EMPLOYEE"],
    },
  },
];
