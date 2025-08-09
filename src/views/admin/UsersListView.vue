<template>
  <div class="px-4">
    <div class="admin-header py-4 w-full">
      <n-breadcrumb class="admin-breadcrumb">
        <n-breadcrumb-item><n-icon :component="PeopleAltFilled" />
          Usuarios
        </n-breadcrumb-item>
      </n-breadcrumb>
      <h1 class="admin-title">Usuarios</h1>
    </div>
    <n-flex class="items-center">
      <n-form class="w-full pb-2 2xl:pb-0" @submit.prevent="handleSearch">
        <n-grid cols="12" x-gap="12" item-responsive>
          <n-form-item-gi span="12 600:4 1250:3" label="Buscar por nombre">
            <n-input placeholder="Nombre de usuario" v-model:value="fullnameFilter"></n-input>
          </n-form-item-gi>
          <n-form-item-gi span="12 600:4 1250:3" label="Buscar por departamento">
            <n-select placeholder="Departamento" :options="departments" label-field="name" value-field="id"
              v-model:value="departmentFilter" :disabled="eFiltersDisabled" clearable />
          </n-form-item-gi>
          <n-form-item-gi span="12 600:4 1250:3" label="Buscar por puesto">
            <n-select placeholder="Puesto" :options="jobs" label-field="name" value-field="id" v-model:value="jobFilter"
              :disabled="eFiltersDisabled" clearable />
          </n-form-item-gi>
          <n-grid-item span="14 600:3 1250:3">
            <div class="flex items-center w-full h-full gap-3"><n-button type="primary" attr-type="submit"><n-icon
                  :component="SearchOutlined" size="18" /></n-button>
              <n-button type="primary" @click="handleSort">
                A-Z <n-icon :component="sortAscending ? TrendingUpFilled : TrendingDownFilled" size="18" />
              </n-button>
              <div class="ms-auto" />
              <n-button type="primary" @click="router.push('users/create')"><n-icon :component="PersonAddFilled"
                  class="me-1" />Nuevo
                empleado</n-button>
            </div>
          </n-grid-item>
        </n-grid>
      </n-form>
    </n-flex>
    <div class="w-full pt-4 pb-4 bg-primary-900 mb-4 mt-4 xl:mt-0" />
    <n-tabs type="segment" animated :on-update:value="handleTab">
      <n-tab-pane name="employees" tab="Empleados">
        <FilterableTable :columns="employeeColumns" :data="employees" />
      </n-tab-pane>
      <n-tab-pane name="teachers" tab="Evaluadores">
        <FilterableTable :columns="teacherColumns" :data="teachers" />
      </n-tab-pane>
    </n-tabs>
    <n-pagination class="pagination" v-model:page="currentPage" :page-count="pagesCount"
      :on-update:page="handlePaginate"></n-pagination>
  </div>
</template>
<script setup>
import { EditFilled, PeopleAltFilled, PersonAddFilled, SearchOutlined, TrendingDownFilled, TrendingUpFilled } from '@vicons/material';
import { findAllDepartments } from '../../service/DepartmentService';
import { h, onMounted, ref } from 'vue';
import { findAllJobs } from '../../service/jobService';
import FilterableTable from '../../components/admin/FilterableTable.vue';
import { useRouter } from 'vue-router';
import { filterEmployees } from '../../service/employeeService.js'
import { NButton, NIcon } from 'naive-ui';
import { filterTeachers } from '../../service/teacherService.js';

const router = useRouter();
const departments = ref([]);
const jobs = ref([]);
const eFiltersDisabled = ref(false);
const pageSize = 15;
const currentPage = ref(1);
const pagesCount = ref(1);
const fullnameFilter = ref('');
const departmentFilter = ref(null);
const jobFilter = ref(null);
const sortAscending = ref(true);
const employees = ref([]);
const teachers = ref([]);
let currentTab = 'employees'
const fetchDepartments = async () => {
  await findAllDepartments().then(response => {
    departments.value = response.data;
  });
}

const fetchJobs = async () => {
  await findAllJobs().then(response => {
    jobs.value = response.data;
  });
}

const handleSort = () => {
  sortAscending.value = !sortAscending.value;
  handleSearch();
}

const handlePaginate = (page) => {
  currentPage.value = page;
  handleSearch();
}

const handleTab = (value) => {
  currentTab = value;
  eFiltersDisabled.value = currentTab !== 'employees';
  handlePaginate(1);
}

const handleSearch = () => {
  ({
    employees: () => fetchEmployees(),
    teachers: () => fetchTeachers()
  })[currentTab]?.();
}

const fetchEmployees = async () => {
  await filterEmployees(
    fullnameFilter.value,
    departmentFilter.value,
    jobFilter.value,
    currentPage.value - 1,
    pageSize,
    sortAscending.value ? 'ASC' : 'DESC',
  ).then(response => {
    const data = response.data;
    employees.value = data.content;
    pagesCount.value = data.totalPages;
  });
}

const fetchTeachers = async() => {
  await filterTeachers(
    fullnameFilter.value,
    currentPage.value - 1,
    pageSize,
    sortAscending.value ? 'ASC': 'DESC'
  ).then(response => {
    const data = response.data;
    teachers.value = data.content;
    pagesCount.value = data.totalPages;
  });
}

const employeeColumns = [
  {
    title: '# Número de empleado',
    key: 'employeeNumber'
  },
  {
    title: 'Nombre',
    key: 'fullname',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: 'Departamento',
    key: 'departments',
    ellipsis: {
      tooltip: true
    },
    render(row) {
      return row.departments?.map(eDepartment => eDepartment?.name).join(', ');
    }
  },
  {
    title: 'Puesto',
    key: 'jobs',
    ellipsis: {
      tooltip: true
    },
    render(row) {
      return row.jobs?.map(eJob => eJob?.name).join(', ');
    }
  },
  {
    width: 100,
    render(row) {
      return h(NButton, { type: 'primary' }, h(NIcon, { size: 18 }, h(EditFilled)))
    }
  }
];

const teacherColumns = [
  {
    title: 'Nombre',
    key: 'fullname'
  },
  {
    render() {
      return h('div', { class: 'flex flex-wrap w-full justify-end gap-3' }, [
        h(NButton, { type: 'primary' }, 'Ver cursos'),
        h(NButton, { type: 'primary' }, h(NIcon, { size: 18 }, h(EditFilled)))
      ]);
    }
  },
];
onMounted(() => {
  fetchDepartments();
  fetchJobs();
  fetchEmployees();
})

</script>
