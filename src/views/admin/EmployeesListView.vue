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
    <n-grid
      class="mt-2"
      cols="1 m:2 l:2"
      x-gap="12"
      y-gap="12"
      responsive="screen"
      item-responsive
    >
      <n-grid-item v-for="employee in paginatedEmployees" :key="employee.id">
        <CardEmployee
          :name="employee.name"
          :employeeNumber="employee.employeeNumber"
          :department="employee.department"
          :job="employee.job"
        />
      </n-grid-item>
    </n-grid>

    <n-pagination
      v-model:page="currentPage"
      :page-count="totalPages"
      :on-update:page="changePage"
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

<script scoped>
import { defineComponent, ref, computed } from "vue";
import {
  NBreadcrumb,
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

export default defineComponent({
  components: {
    NBreadcrumb,
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
    const searchQuery = ref("");
    const sortAscending = ref(true);

    const toggleSortOrder = () => {
      sortAscending.value = !sortAscending.value;
    };
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

    const employees = ref([
      {
        id: 1,
        name: "Marquina Hernández Joana Andrea",
        employeeNumber: "623",
        department: "Laboratorio Quimico para limpiadores",
        job: "Químico de Estabilidad ",
      },
      {
        id: 2,
        name: "Carlos Pérez",
        employeeNumber: "456",
        department: "IT",
        job: "Desarrollador",
      },
      {
        id: 3,
        name: "Ana Gómez",
        employeeNumber: "789",
        department: "RRHH",
        job: "Reclutadora",
      },
      {
        id: 4,
        name: "Luis Torres",
        employeeNumber: "101",
        department: "Ventas",
        job: "Ejecutivo de cuentas",
      },
      {
        id: 5,
        name: "Sofía Martínez",
        employeeNumber: "202",
        department: "Marketing",
        job: "Diseñadora gráfica",
      },
      {
        id: 6,
        name: "Fernando López",
        employeeNumber: "303",
        department: "Producción",
        job: "Ingeniero de calidad",
      },
      {
        id: 7,
        name: "Elena Ríos",
        employeeNumber: "404",
        department: "Administración",
        job: "Contadora",
      },
      {
        id: 8,
        name: "Javier Domínguez",
        employeeNumber: "505",
        department: "Seguridad",
        job: "Jefe de seguridad",
      },
      {
        id: 9,
        name: "Laura Méndez",
        employeeNumber: "606",
        department: "Compras",
        job: "Coordinadora de compras",
      },
      {
        id: 10,
        name: "Roberto Chávez",
        employeeNumber: "707",
        department: "Almacén",
        job: "Supervisor de inventarios",
      },
    ]);

    const itemsPerPage = 6;
    const currentPage = ref(1);
    const totalPages = computed(() => Math.ceil(employees.value.length / itemsPerPage));
    const paginatedEmployees = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return employees.value.slice(start, start + itemsPerPage);
    });
    const changePage = (page) => {
      currentPage.value = page;
    };

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
      searchQuery,
      TrendingUpFilled,
      TrendingDownFilled,
      toggleSortOrder,
      sortAscending,
      departmentOptions,
      jobsOptions,
      employees,
      itemsPerPage,
      currentPage,
      totalPages,
      paginatedEmployees,
      changePage,
      MoreVertFilled,
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

.search-input {
  flex-grow: 1;
}

.search-button {
  padding: 8px 12px;
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

.compact-employee-card {
  height: auto;
  min-height: unset;
  padding: 12px;
}

.card-content {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.employee-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name-code-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.employee-name {
  font-weight: bold;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.employee-code {
  font-size: 0.85rem;
  color: #778c96;
  white-space: nowrap;
}

.details-row {
  display: flex;
  gap: 12px;
  font-size: 0.85rem;
  color: #555;
}

.department::before {
  content: "Dpto: ";
  font-weight: bold;
}

.position {
  font-style: italic;
}

.actions {
  display: flex;
  align-items: flex-start;
}
</style>
