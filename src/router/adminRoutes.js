import AdminLayout from "../components/admin/AdminLayout.vue";
import AdminDashboardView from "../views/admin/AdminDashboardView.vue";
import CoursesListView from "../views/admin/CoursesListView.vue";
import DepartmentsListView from "../views/admin/DepartmentsListView.vue";
import ProfileView from "../views/admin/ProfileView.vue";
import NewCourseView from "../views/admin/NewCourseView.vue";
import CreateDepartment from "../views/admin/CreateDepartment.vue";
import UpdateDepartmentView from "../views/admin/UpdateDepartmentView.vue";

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
        component:()=>import("@/views/admin/AdminEmployeeView.vue"),
        children:[
          {
            path:"",
            component:()=>import("@/views/admin/EmployeesListView.vue"),
            name:"employees"
          },
          {
            path:"new",
            component:()=>import("@/components/admin/FormNewEmployee.vue"),
            name:"new-employee"
          }
        ]
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
        path: "departments/create",
        component: CreateDepartment
      },
      {
        path: "departments/update/:id",
        name: 'updateDepartment',
        component: UpdateDepartmentView,
        props: true
      },
      {
        path: "profile",
        component: ProfileView
      },
      {
        path: "courses/new-course",
        component: NewCourseView
      }
    ],
    
  },
];
