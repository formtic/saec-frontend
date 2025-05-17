<template>
  <div style="height: 100dvh">
    <div class="text-center">
      <p class="lg:text-[55px] md:text-[40px] text-[28px] mt-4 text-sky-700">
        Lista de departamentos
      </p>
    </div>

    <div v-if="loading" class="items-center justify-center min-h-[80dvh] flex">
      <Spinner />
    </div>
    <div
      v-else-if="cursos.length === 0"
      class="min-h-[80dvh] grid content-center gap-4 justify-center"
    >
      <div class="text-center">
        <p class="lg:text-[35px] md:text-[30px] text-[25px] pr-5">
          No hay departamentos disponibles o asignados
        </p>
      </div>
      <div class="justify-center flex">
        <component
          :is="AllInboxFilled"
          class="md:w-25 md:h-25 w-15 h-15 text-sky-500"
        />
      </div>
    </div>
    <div v-else class="grid p-4 justify-items-strech">
      <div class="md:my-8 mb-4 mx-5">
        <label for="iptSearch">Buscar departamento:</label>
        <input
          id="iptSearch"
          class="w-full md:text-xl text-sm py-1 pl-2 focus:border-sky-700 rounded-sm border-1"
          type="text"
          placeholder="Nombre del departamento"
        />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4 p-4">
        <CardCourse
          v-for="curso in cursos"
          :key="curso.id"
          :id="curso.id"
          :name="curso.name"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import CardCourse from '@/components/evaluator/CardCourse.vue';
import Spinner from '@/components/common/Spinner.vue';
import { AllInboxFilled } from '@vicons/material';

const cursos = ref([
    {id: 1, name: 'Departamento 1'},
    {id: 2, name: 'Departamento 2'},
    {id: 3, name: 'Departamento 3'},
    {id: 4, name: 'Departamento 4'},
    {id: 5, name: 'Departamento 5'},
])

const loading = ref(false)
</script>
