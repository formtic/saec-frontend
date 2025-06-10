import AdminLayout from "../components/admin/AdminLayout.vue";
import AdminDashboardView from "../views/admin/AdminDashboardView.vue";
import EmployeesListView from "../views/admin/EmployeesListView.vue";
import CoursesListView from "../views/admin/CoursesListView.vue";
import DepartmentsListView from "../views/admin/DepartmentsListView.vue";
import ProfileView from "../views/admin/ProfileView.vue";
import NewCourseView from "../views/admin/NewCourseView.vue";
import CreateCourse from "../views/admin/CreateCourse.vue";

export default [
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "",
        component: AdminDashboardView,
      },
      {
        path: "employees",
        component: EmployeesListView
      },
      {
        path: "courses",
        component: CoursesListView
      },
      {
        path: "departments",
        component: DepartmentsListView
      },
      {
        path: "profile",
        component: ProfileView
      },
      {
        path: "courses/new-course",
        component: CreateCourse
      }
    ],
    
  },
];
