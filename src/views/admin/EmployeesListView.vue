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
    <n-space size="large" vertical>
      <n-grid x-gap="16" cols="1 m:9 l:9" item-responsive responsive="screen">
        <n-grid-item span="1 m:2 l:2">
          <n-form-item label="Buscar empleado">
            <n-input-group>
              <n-input placeholder="Nombre empleado" clearable />
              <n-button type="primary"><n-icon :component="SearchFilled" /></n-button>
            </n-input-group>
          </n-form-item>
        </n-grid-item>
        <n-grid-item span="1 m:2 l:2">
          <n-form-item label="Filtro por departamento">
            <n-input-group>
              <n-select :options="departmentOptions" placeholder="Departamento" />
              <n-button type="primary"><n-icon :component="SearchFilled" /></n-button>
            </n-input-group>
          </n-form-item>
        </n-grid-item>
        <n-grid-item span="1 m:2 l:2">
          <n-form-item label="Filtro por puestos">
            <n-input-group>
              <n-select :options="jobsOptions" placeholder="Puesto de trabajo" />
              <n-button type="primary"><n-icon :component="SearchFilled" /></n-button>
            </n-input-group>
          </n-form-item>
        </n-grid-item>
        <n-grid-item class="styleContentButton" span="1">
          <n-button class="styleButton" @click="toggleSortOrder" type="primary">
            <span style="color: white">A-Z</span>
            <n-icon
              :component="sortAscending ? TrendingUpFilled : TrendingDownFilled"
              color="#ffffff"
              size="20"
            />
          </n-button>
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
import {findAll as findAllService} from "../../service/employeeService.js";
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
    const currentPage = ref(1);
    const totalPages = ref(1);
    const employees = ref([]);
    const sortField=ref("fullname");
    const sortDirection = ref("ASC");
    const changePage = (page) => {
      currentPage.value = page;
      loadEmployees();
    };

    const loadEmployees=async()=>{
      try {
        const response = await findAllService(currentPage.value-1,sortField.value,sortDirection.value);
        console.log("API RESPONSE: ",response);
        employees.value=response.data.content;
        totalPages.value=response.data.totalPages;
      } catch (error) {
        console.log("Error",error);
      }
    }

    onMounted(async() => {
      loadEmployees();
    });

    const sortAscending = ref(true);
    const toggleSortOrder=async()=>{
      sortAscending.value = !sortAscending.value;
      sortDirection.value = sortAscending.value ? "ASC" : "DESC";
      await loadEmployees();
    }

    const departmentOptions = [
      { label: "Inyección", value: "inyección" },
      { label: "Producción", value: "produccion" },
      { label: "Inyección1", value: "inyección1" },
      { label: "Producción2", value: "produccion2" },
      { label: "Inyección3", value: "inyección3" },
      { label: "Producción4", value: "produccion4" },
    ];

    const jobsOptions = [
      { label: "Opción 1", value: "Opción 1" },
      { label: "Opción 2", value: "Opción 2" },
      { label: "Opción 3", value: "Opción 3" },
      { label: "Opción 4", value: "Opción 4" },
    ];

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
      departmentOptions,
      jobsOptions,
      employees,
      MoreVertFilled,
      sortAscending,
      CardEmployee,
      paginationTheme,
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
