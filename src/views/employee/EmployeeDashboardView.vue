<template>
  <div class="employee-dashboard">
    <!-- Contenido principal del dashboard, por ejemplo un título o resumen -->
    <h2 class="mb-4">Bienvenido al Panel del Empleado</h2>

    <!-- Aquí se cargan las vistas hijas como course-info/:courseId -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "EmployeeDashboardView",
};
</script>

<style scoped>
.employee-dashboard {
  padding: 16px;
}
</style>
