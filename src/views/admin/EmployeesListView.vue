<template>
  <div class="px-4">
    <!-- cabecera -->
    <div class="admin-header pt-4 pb-4">
      <n-breadcrumb class="admin-breadcumb">
        <n-breadcrumb-item>
          <n-icon :component="PeopleAltFilled" />
          Empleados
        </n-breadcrumb-item>
      </n-breadcrumb>
      <h1 class="admin-title">Empleados</h1>
    </div>
    <!-- filtros de busqueda -->
    <h3 class="mb-4">Filtros:</h3>
    <n-space size="large" vertical>
      <n-grid x-gap="16" cols="1 m:9 l:9" item-responsive responsive="screen">
        <n-grid-item span="1 m:2 l:2">
          <n-form-item label="Por empleado">
            <n-input-group>
              <n-input clearable v-model:value="keyword" placeholder="Nombre empleado" @update:value="handleKeywordChange"/>
              <n-button @click="findEmployee" type="primary"><n-icon :component="SearchFilled" /></n-button>
            </n-input-group>
          </n-form-item>
        </n-grid-item>
        <n-grid-item span="1 m:2 l:2">
          <n-form-item label="Por departamento">
            <n-input-group>
              <n-select clearable v-model:value="selectedDepartment" :options="departmentOptions" placeholder="Departamento" @update:value="handleKeywordChangeDepartment"/>
              <n-button @click="findByDepartment" type="primary"><n-icon :component="SearchFilled" /></n-button>
            </n-input-group>
          </n-form-item>
        </n-grid-item>
        <n-grid-item span="1 m:2 l:2">
          <n-form-item label="Por puesto">
            <n-input-group>
              <n-select clearable v-model:value="selectedJob" :options="jobsOptions" placeholder="Puesto de trabajo" @update:value="handleKeywordChangeJob"/>
              <n-button @click="findByJob" type="primary"><n-icon :component="SearchFilled" /></n-button>
            </n-input-group>
          </n-form-item>
        </n-grid-item>
        <n-grid-item class="styleContentButton" span="1">
          <n-form-item>
            <n-button class="styleButton" @click="toggleSortOrder" type="primary">
            <span style="color: white">A-Z</span>
            <n-icon
              :component="sortAscending ? TrendingUpFilled : TrendingDownFilled"
              color="#ffffff"
              size="20"
            />
            </n-button>
          </n-form-item>
        </n-grid-item>
        <n-grid-item span="0 m:2 l:2" class="styleContentButton">
          <n-button class="styleButton" @click="" type="primary">
            <span style="color: white">Nuevo Empleado</span>
          </n-button>
        </n-grid-item>
      </n-grid>
    </n-space>

    <!-- lista de contenido -->
    <div style="background-color:#0D5A79; border-radius:10px 10px 0 0;" class="p-4 mt-2"/>
      <n-scrollbar style="max-height: 360px">
        <n-grid class="mt-2" cols="1 m:2 l:2" x-gap="12" y-gap="12" responsive="screen" item-responsive>
            <n-grid-item v-for="employee in employees" :key="employee.employeeNumber">
              <CardEmployee
                :name="employee.fullname"
                :employeeNumber="employee.employeeNumber"
                :department="employee.departments"
                :job="employee.jobs"
              />
            </n-grid-item>
        </n-grid>
      </n-scrollbar>

    <n-pagination
      :page="currentPage"
      :page-count="totalPages"
      @update:page="changePage"
      class="pagination"
      :theme-overrides="paginationTheme"
    />
    
    <div class="lg:hidden">
      <n-float-button
        :bottom="20"
        :right="20"
        width="50"
        height="50"
        style="background-color:#00485F;color:white"
      >
        <n-icon :component="PlusFilled" size="20" />
      </n-float-button>
    </div>

  </div>
</template>

<script>
import { defineComponent, ref, computed,onMounted } from "vue";
import {
  NBreadcrumb,
  NScrollbar,
  NBreadcrumbItem,
  NIcon,
  NForm,
  NFormItem,
  NInput,
  NButton,
  NSelect,
  NGrid,
  NGi,
  NCard,
  NPagination,
  NGridItem,
  NSpace,
  NInputGroup,
  NFloatButton,
} from "naive-ui";
import {
  PeopleAltFilled,
  SearchFilled,
  TrendingUpFilled,
  TrendingDownFilled,
  MoreVertFilled,
  PlusFilled,
} from "@vicons/material";
import CardEmployee from "../../components/admin/CardEmployee.vue";
import {findAll as findAllEmployeesService, findEmployeeBy, findEmployeeByDepartment as findByDepartmentService, findEmployeeByJob} from "../../service/employeeService.js";
import {findAll as findAllDepartmentService} from "../../service/DepartmentService.js";
import {findAll as findAllJobs} from "../../service/jobService.js";
export default defineComponent({
  components: {
    NBreadcrumb,
    NScrollbar,
    NBreadcrumbItem,
    NIcon,
    NForm,
    NGridItem,
    NFormItem,
    NInput,
    NFloatButton,
    NInputGroup,
    NButton,
    SearchFilled,
    NSelect,
    NGrid,
    NGi,
    NCard,
    NPagination,
    NSpace,
    CardEmployee,
  },
  setup() {
    const selectedDepartment = ref(null);
    const selectedJob = ref(null);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const employees = ref([]);
    const departmentOptions = ref([]);
    const jobsOptions = ref([]);
    const sortField=ref("fullname");
    const sortDirection = ref("ASC");
    const keyword = ref("");

    const changePage = (page) => {
      currentPage.value = page;
      loadEmployees();
    };

    const loadEmployees=async()=>{
      try {
        const response = await findAllEmployeesService(currentPage.value-1,sortField.value,sortDirection.value);
        employees.value=response.data.content;
        totalPages.value=response.data.totalPages;
      } catch (error) {
        console.log("Error",error);
      }
    }

    onMounted(async() => {
      loadEmployees();
      loadDepartments();
      loadJobs();
    });

    const handleKeywordChange = async (value) => {
      keyword.value = value;
      if (value === '') {
        await loadEmployees();
      }
    };

    const handleKeywordChangeDepartment = async (value) => {
      selectedDepartment.value = value;
      if (value === null) {
        await loadEmployees();
      }
    };

    const handleKeywordChangeJob = async (value) => {
      selectedJob.value = value;
      if (value === null) {
        await loadEmployees();
      }
    };


    const filtersAreActive = computed(() => {
      return (
        keyword.value !== "" ||
        selectedDepartment.value !== null ||
        selectedJob.value !== null
      );
    });

    const clearFilters = async () => {
      keyword.value = "";
      selectedDepartment.value = null;
      selectedJob.value = null;
      await loadEmployees();
    };

    const sortAscending = ref(true);
    const toggleSortOrder = async () => {
      sortAscending.value = !sortAscending.value;
      sortDirection.value = sortAscending.value ? "ASC" : "DESC";

      if (keyword.value) {
        // Solo nombre
        await findEmployee();
      } else if (selectedDepartment.value) {
        // Solo departamento
        await findByDepartment();
      } else if (selectedJob.value) {
        // Solo puesto
        await findByJob();
      } else {
        // Ningún filtro => trae todo
        await loadEmployees();
      }
    };



    const findEmployee =async()=>{
      const response = await findEmployeeBy(sortField.value,sortDirection.value,keyword.value);
      employees.value=response.data.content;
      totalPages.value = response.data.totalPages;
    }

    const findByDepartment = async()=>{
      const response = await findByDepartmentService(sortField.value,sortDirection.value,selectedDepartment.value);
      employees.value = response.data.content;
      totalPages.value = response.data.totalPages;
    }

    const findByJob=async()=>{
      const response = await findEmployeeByJob(sortField.value,sortDirection.value,selectedJob.value);
      employees.value = response.data.content;
      totalPages.value = response.data.totalPages;
    }

    const loadDepartments =async()=>{
      const response = await findAllDepartmentService();
      departmentOptions.value=response.data.map(dep=>({label:dep.name,value:dep.id}))
    }

    const loadJobs=async()=>{
      const response = await findAllJobs();
      jobsOptions.value = response.data.map(job=>({label:job.name,value:job.id}))
    }

    const paginationTheme = {
      itemColor: "#0D5A79",
      itemColorActive: "white",
      itemTextColor: "white",
      itemTextColorActive: "#0D5A79",
      itemTextColorHover: "white",
      itemColorHover: "rgba(255,255,255,0.1)",
      borderRadius: "6px",
      itemSize: "32px",
    };

    return {
      PeopleAltFilled,
      PlusFilled,
      SearchFilled,
      TrendingUpFilled,
      TrendingDownFilled,
      currentPage,
      totalPages,
      changePage,
      employees,
      toggleSortOrder,
      findEmployee,
      departmentOptions,
      jobsOptions,
      employees,
      MoreVertFilled,
      sortAscending,
      CardEmployee,
      paginationTheme,
      keyword,
      clearFilters,
      filtersAreActive,
      selectedDepartment,
      selectedJob,
      loadJobs,
      handleKeywordChange,
      handleKeywordChangeDepartment,
      handleKeywordChangeJob,
      findByDepartment,
      findByJob,
    };
  },
});
</script>

<style scoped>
.styleButton {
  border-radius: 5px;
}
@media (max-width: 425px) {
  .styleButton {
    width: 100%;
    margin: 5px;
  }
}
.styleContentButton {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left:2px
}
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: #0d5a79;
  text-align: end;
}

@media (max-width: 425px) {
  .admin-title {
    font-size: 2.6rem;
    text-align: center;
  }
}

@media (max-width: 425px) {
  .admin-header {
    padding-top: 15px;
  }
}
</style>
