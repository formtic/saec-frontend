import AdminLayout from "../components/admin/AdminLayout.vue";
import AdminDashboardView from "../views/admin/AdminDashboardView.vue";
import EmployeesListView from "../views/admin/EmployeesListView.vue";
import CoursesListView from "../views/admin/CoursesListView.vue";
import DepartmentsListView from "../views/admin/DepartmentsListView.vue";
import ProfileView from "../views/admin/ProfileView.vue";
import CreateDepartment from "../views/admin/CreateDepartment.vue";
import UpdateDepartmentView from "../views/admin/UpdateDepartmentView.vue";
import JobsListView from "../views/admin/JobsListView.vue";
import CreateJobview from "../views/admin/CreateJobview.vue";
import UpdateJobView from "../views/admin/UpdateJobView.vue";
import CreateCourse from "../views/admin/CreateCourse.vue";
import UpdateCourse from "../views/admin/UpdateCourse.vue";
import SetCourseInfoForm from "../components/admin/SetCourseInfoForm.vue";
import TestEditorView from "../views/admin/TestEditorView.vue";
import AdminCourseContentView from "../components/admin/AdminCourseContentView.vue";
import AdminCourseAssignationView from "../views/admin/AdminCourseAssignationView.vue";

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
        path: 'jobs',
        component: JobsListView
      },
      {
        path: 'jobs/create',
        name: 'createJob',
        component: CreateJobview,
      },
      {
        path: 'jobs/update/:id',
        name: 'updateJob',
        component: UpdateJobView,
        props: true
      },
      {
        path: "profile",
        component: ProfileView
      },
      {
        path: "courses/new-course",
        component: CreateCourse
      },
      {
        path: 'courses/update/:id',
        component: UpdateCourse,
        props: true,
        children: [
          {
            path: 'course-info',
            component: SetCourseInfoForm
          },
          {
            path: 'course-test',
            component: TestEditorView
          },
          {
            path: 'course-content',
            component: AdminCourseContentView
          },
          {
            path: 'course-assignation',
            component: AdminCourseAssignationView
          }
        ]
      }
    ],
    
  },
];
