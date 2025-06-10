<template>
  <div class="form-container">
    <div style="padding: 1rem; width: 100%;">
      <!-- Encabezado -->
      <div class="admin-header">
        <n-breadcrumb class="admin-breadcumb">
          <n-breadcrumb-item @click="navigateBack">
            <n-icon :component="BookFilled" />
            Empleados
          </n-breadcrumb-item>
          <n-breadcrumb-item>
            Cursos
          </n-breadcrumb-item>
          <n-breadcrumb-item>
            Nuevo curso
          </n-breadcrumb-item>
        </n-breadcrumb>
        <h1 class="admin-title">Nuevo curso</h1>
      </div>

      <!-- Formulario -->
      <n-form>
        <n-form-item label="Nombre" required>
          <n-input
            placeholder="Ej. Introducción"
            v-model:value="nombre"
          />
        </n-form-item>

        <n-form-item label="Descripción" required>
          <n-input
            type="textarea"
            placeholder="Ej. MPF-113 GEN-03 Procedimiento de limpieza para las áreas de manufactura"
            v-model:value="descripcion"
            :autosize="{ minRows: 6 }"
          />
        </n-form-item>

        <n-form-item label="Docente" required>
          <n-select
            placeholder="Seleccionar docente"
            :options="docentes"
            v-model:value="docente"
          />
        </n-form-item>

        <n-form-item label="Examen">
          <n-select
            placeholder="Seleccionar examen"
            :options="examenes"
            v-model:value="examen"
          />
        </n-form-item>

        <div class="form-button">
          <n-button
            type="primary"
            color="#0D5A79"
            size="large"
            @click="registrarCurso"
          >
            Registrar curso
          </n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  NBreadcrumb,
  NBreadcrumbItem,
  NFormItem,
  NInput,
  NSelect,
  NButton,
  NIcon,
} from 'naive-ui';
import { BookFilled } from '@vicons/material';

const router = useRouter();
const navigateBack = () => router.replace('/admin/employees');

const nombre = ref('');
const descripcion = ref('');
const docente = ref(null);
const examen = ref(null);

const docentes = [
  { label: 'Juan Pérez', value: 'juan' },
  { label: 'Ana Torres', value: 'ana' },
];

const examenes = [
  { label: 'Examen A', value: 'exa' },
  { label: 'Examen B', value: 'exb' },
];

const registrarCurso = () => {
  console.log({
    nombre: nombre.value,
    descripcion: descripcion.value,
    docente: docente.value,
    examen: examen.value,
  });
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.admin-title {
  font-size: 3.2rem;
  font-weight: bold;
  color: #0d5a79;
}


.form-button {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .admin-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .admin-title {
    font-size: 2.4rem;
    margin-top: 1rem;
  }
}
</style>
