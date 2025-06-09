<template>
  <div class="pr-4 pl-4">
    <div class="admin-header pt-4 pb-4">
      <n-breadcrumb class="admin-breadcumb">
        <n-breadcrumb-item>
          <n-icon :component="DashboardFilled" />
          Panel General
        </n-breadcrumb-item>
      </n-breadcrumb>
      <h1 class="admin-title">Panel General</h1>
    </div>
    <div class="card-container">
      <analytics-card :icon="HomeFilled" title="Departamentos" counter="30"/>
      <analytics-card :icon="PeopleAltFilled" title="Empleados" counter="30"/>
      <analytics-card :icon="BookFilled" title="Cursos" counter="30"/>
      <analytics-card :icon="InsertDriveFileFilled" title="Exámenes" counter="30"/>
    </div>
    
    <!-- Nuevo grid para tabla y calendario -->
    <n-grid cols="24" x-gap="12" responsive="screen" class="mt-6">
      <n-gi span="16">
          <!-- Aquí tu componente de tabla -->
          <n-data-table
            :columns="columns"
            :data="data"
            :pagination="pagination"
          />
      </n-gi>
      <n-gi span="8">
        <h1>Hola mundo</h1>
      </n-gi>
    </n-grid>
  </div>
</template>

<script scoped>
import { defineComponent, ref } from "vue";
import { 
  NBreadcrumb, 
  NBreadcrumbItem, 
  NIcon, 
  NCard,
  NGrid,
  NGi,
  NDataTable,
  NCalendar
} from "naive-ui";
import { 
  DashboardFilled, 
  HomeFilled, 
  PeopleAltFilled, 
  BookFilled, 
  InsertDriveFileFilled 
} from "@vicons/material";
import AnalyticsCard from "../../components/admin/AnalyticsCard.vue";

export default defineComponent({
  components: {
    NBreadcrumb,
    NBreadcrumbItem,
    NIcon,
    NCard,
    NGrid,
    NGi,
    NDataTable,
    NCalendar,
    AnalyticsCard,
  },
  setup() {
    // Datos para la tabla (ejemplo)
    const columns = ref([
      { title: 'ID', key: 'id' },
      { title: 'Nombre', key: 'name' },
      { title: 'Edad', key: 'age' }
    ]);
    
    const data = ref([
      { id: 1, name: 'John Doe', age: 28 },
      { id: 2, name: 'Jane Smith', age: 32 }
    ]);
    
    const pagination = ref({
      pageSize: 5
    });
    
    
    return {
      DashboardFilled,
      HomeFilled,
      PeopleAltFilled,
      BookFilled,
      InsertDriveFileFilled,
      columns,
      data,
      pagination,
    };
  }
})
</script>

<style scoped>
.card-container{
  display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 1rem;
}

</style>