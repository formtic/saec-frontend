import EmployeeLayout from "../components/employee/EmployeeLayout.vue";
import EmployeeDashboardView from "../views/employee/EmployeeDashboardView.vue";

export default [
  {
    path: "/employee",
    component: EmployeeLayout,
    children: [
      {
        path: "",
        component: EmployeeDashboardView,
      },
    ],
    meta: {
      requiresAuth: true,
      roles: ["ROLE_EMPLOYEE"],
    },
  },
];
