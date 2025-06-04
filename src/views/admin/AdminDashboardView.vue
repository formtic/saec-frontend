<template>
  <div style="padding-left: 1rem; padding-right: 1rem;">
    <div class="admin-header">
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
.admin-title {
  font-size:3.5rem; font-weight: bold; color: #0D5A79
}
.admin-breadcumb{
  display: flex;
}
.admin-header{
  display: flex; justify-content: space-between; align-items: center;
}
.mt-6 {
  margin-top: 1.5rem;
}
.h-full {
  height: 100%;
}

@media(max-width: 886px) {
  .card-container{
    flex-direction: column;
    gap: 1rem;
  }
  .admin-title {
    font-size: 2rem;
  }
  .admin-breadcumb{
    display: none;
  }
  .admin-header{
    justify-content: center;
  }
  
  /* Responsive para el grid */
  [n-gi] {
    grid-column: span 24 !important;
  }
}
</style>