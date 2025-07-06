<template>
  <div class="px-4">
    <div class="admin-header pt-4 pb-4 w-full">
      <n-breadcrumb class="admin-breadcrumb">
        <n-breadcrumb-item @click="router.push('/admin/courses')"><n-icon :component="BookFilled" />
          Cursos
        </n-breadcrumb-item>
        <n-breadcrumb-item> <n-icon :component="AddOutlined" />
          Nuevo
        </n-breadcrumb-item>
      </n-breadcrumb>
      <h1 class="admin-title">Nuevo curso</h1>
    </div>
    <n-space vertical size="large">
      <n-steps>
        <n-flex class="w-full">
          <n-step title="Información del curso" description="Indique la información general del curso" status="process">
            <template #icon>
              <n-icon :component="InfoOutlined" />
            </template>
          </n-step>
          <n-step title="Examen" description="Editar examen" status="wait">
            <template #icon>
              <n-icon :component="EditNoteFilled" />
            </template>
          </n-step>
          <n-step title="Contenido" description="Secciones del curso" status="wait">
            <template #icon>
              <n-icon :component="LibrarySharp" />
            </template>
          </n-step>
          <n-step title="Asignaciones" description="Asignar curso a empleados" status="wait">
            <template #icon>
              <n-icon :component="TaskOutlined" />
            </template>
          </n-step>
        </n-flex>
      </n-steps>
      <NewCourseForm class="mt-6" />
    </n-space>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { BookFilled, AddOutlined, InfoOutlined, EditNoteFilled, TaskOutlined } from '@vicons/material';
import { LibrarySharp } from '@vicons/ionicons5';
import { NBreadcrumb, NBreadcrumbItem, NIcon, NSpace, NSteps, NStep } from 'naive-ui'
import NewCourseForm from '../../components/admin/NewEmptyCourseForm.vue';
const router = useRouter();
</script>