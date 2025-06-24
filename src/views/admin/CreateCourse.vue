<template>
  <div class="form-container">
    <div style="padding: 1rem; width: 100%;">
      <!-- Encabezado -->
      <div class="admin-header">
        <n-breadcrumb class="admin-breadcumb">
          <n-breadcrumb-item @click="router.push('/admin/courses')">
            <n-icon :component="BookFilled" />
            Cursos
          </n-breadcrumb-item>
          <n-breadcrumb-item>
            <n-icon :component="AddOutlined" />
            Nuevo curso
          </n-breadcrumb-item>
        </n-breadcrumb>
        <h1 class="admin-title">Nuevo curso</h1>
      </div>

      <!-- Formulario -->
      <n-form ref="formRef" :rules="rules" :model="modelRef" @submit.prevent="handleValidateButtonClick">
        <n-form-item label="Nombre" required path="nombre">
          <n-input placeholder="Ej. Introducción" v-model:value="modelRef.nombre" />
        </n-form-item>

        <n-form-item label="Descripción" required path="descripcion">
          <n-input type="textarea"
            placeholder="Ej. MPF-113 GEN-03 Procedimiento de limpieza para las áreas de manufactura"
            v-model:value="modelRef.descripcion" :autosize="{ minRows: 6 }" />
        </n-form-item>

        <n-form-item label="Docente" required path="docente">
          <n-select placeholder="Seleccionar docente" :options="docentes" v-model:value="modelRef.docente"
            label-field="fullname" filterable value-field="id" />
        </n-form-item>

        <n-form-item label="Examen">
          <n-select placeholder="Seleccionar examen" :options="examenes" v-model:value="modelRef.examen"
            label-field="name" filterable value-field="id" />
        </n-form-item>
        <n-flex justify="center">
          <n-button type="primary" attr-type="submit" size="large" @click="handleValidateButtonClick">
            Registrar curso
          </n-button>
        </n-flex>
      </n-form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
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
import { AddOutlined, BookFilled } from '@vicons/material';
import { findAllByStatus } from '../../service/teacherService.js';
import { findTestsByStatus } from '../../service/testService.js';
import { create } from '../../service/courseService.js';
const formRef = ref(null);
function handleValidateButtonClick(e) {
  e.preventDefault();
  formRef.value?.validate(
    (errors) => {
      if (!errors) {
        registrarCurso();
      }
    }
  );
}

const router = useRouter();

const modelRef = ref({
  nombre: '',
  descripcion: '',
  docente: '',
  examen: ''
});

const docentes = ref([]);
const examenes = ref([]);

const getTeachers = async () => {
  await findAllByStatus('ENABLED').then(response => {
    docentes.value = response.data;
  });
}

const getAvailableTests = async () => {
  await findTestsByStatus('CREATED')
    .then(response => {
      examenes.value = response.data;
    });
}

const registrarCurso = async () => {
  const payload = {
    name: modelRef.value.nombre,
    description: modelRef.value.descripcion,
    teacherId: modelRef.value.docente,
    testId: modelRef.value.examen ?? ''
  };
  await create(payload)
    .then(() => {
      setTimeout(() => {
        router.push('/admin/courses');
      }, 2000)
    })

};

onMounted(() => {
  getTeachers();
  getAvailableTests();
});

const rules = {
  nombre: [
    {
      required: true,
      message: 'El nombre es obligatorio.',
      trigger: ['input', 'blur'],
    }
  ],
  descripcion: [
    {
      required: true,
      message: 'La descripción es obligatoria.',
      trigger: ['input', 'blur']
    }
  ],
  docente: [
    {
      required: true,
      message: 'Selecciona un docente.',
      trigger: ['change', 'blur']
    }
  ]
}

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
