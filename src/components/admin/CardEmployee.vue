<template>
  <n-card class="employee-card" :bordered="true" size="small">
      <n-space vertical size="small" class="relative">
      <!-- Fila 1: Nombre / Código -->
      <n-grid cols="1 s:1 m:2 l:2" item-responsive responsive="screen">
        <n-grid-item class="text-left">
          <span class="font-semibold text-base">{{ name }}</span>
        </n-grid-item>
        <n-grid-item class="text-left md:text-right lg:text-right text-gray-500">
          <span>Código: {{ employeeNumber }}</span>
        </n-grid-item>
      </n-grid>


      <!-- Fila 2: Departamento / Puesto -->
      <n-grid cols="1 s:1 m:2 l:2" item-responsive responsive="screen">
        <n-grid-item class="text-left">
          <span class="font-medium">Dpto. {{ department.join(', ') }}</span>
        </n-grid-item>
        <n-grid-item class="text-left md:text-right lg:text-right text-gray-500">
          <span class="italic">{{ job.join(', ') }}</span>
        </n-grid-item>
      </n-grid>
      </n-space>
  </n-card>
</template>


<script setup>
import { NCard, NButton, NIcon,NGrid,NGridItem,NSpace } from 'naive-ui'
import { MoreVertFilled } from '@vicons/material'

defineProps({
  name: String,
  employeeNumber: String,
  department: String,
  job: String
})

const options=[
  {
    label:"Desactivar",
    key:"Desactivar"
  },
  {
    label:"Editar",
    key:"Editar"
  },
  {
    label:"Perfil",
    key:"Perfil"
  }
]

</script>

<style scoped>
.employee-card {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #4a90e2; /* Azul tipo la imagen */
}
</style>