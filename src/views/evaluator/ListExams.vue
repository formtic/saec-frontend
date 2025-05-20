<template>
  <div class="h-[100dvh]">
    <!-- Encabezado -->
    <div class="grid grid-cols-3 mb-4 items-center">
      <button @click="goBack()" class="ml-3">
        <component :is="ArrowBackFilled" class="w-10 h-10 text-neutral-900" />
      </button>
      <p class="text-center text-[15px] lg:text-[40px] md:text-[24px] mt-4 text-sky-700">
        Lista de exámenes
      </p>
    </div>

    <p class="text-center mb-4"><b>Curso:</b> {{ title }}</p>

    <!-- Filtros -->
    <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-6 gap-4 px-4">
      <div>
        <label for="iptSearchExam">Buscar examen:</label>
        <input
          id="iptSearchExam"
          v-model="searchExam"
          class="w-full focus:border-sky-700 rounded-sm border py-1 pl-2"
          type="text"
          placeholder="Nombre de examen"
        />
      </div>
      <div>
        <label for="iptSearchEmployee">Buscar empleado:</label>
        <input
          id="iptSearchEmployee"
          v-model="searchEmployee"
          class="w-full focus:border-sky-700 rounded-sm border py-1 pl-2"
          type="text"
          placeholder="Nombre de empleado"
        />
      </div>
      <div>
        <label for="iptSearchDate">Fecha:</label>
        <select
          id="iptSearchDate"
          v-model="sortOrder"
          class="w-full focus:border-sky-700 rounded-sm border py-1 pl-2"
        >
          <option disabled selected>Ordenar por fecha</option>
          <option value="asc">Más antiguo</option>
          <option value="desc">Más reciente</option>
        </select>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex justify-center gap-4 mb-2">
      <button
        class="py-2 px-4 font-semibold rounded-t"
        :class="selectedTab === 'sinCalificar' ? 'bg-sky-700 text-white' : 'bg-sky-200 text-sky-800'"
        @click="selectedTab = 'sinCalificar'"
      >
        Exámenes sin calificar
      </button>
      <button
        class="py-2 px-4 font-semibold rounded-t"
        :class="selectedTab === 'calificados' ? 'bg-sky-700 text-white' : 'bg-sky-200 text-sky-800'"
        @click="selectedTab = 'calificados'"
      >
        Exámenes calificados
      </button>
    </div>

    <!-- Contenedor Scrollable con Tabla simulada -->
    <div class="border rounded-lg border-sky-800 mx-4">
      <div class="h-4 bg-sky-700 rounded-t-lg"></div>

      <div class="relative p-4 overflow-x-auto max-h-[50vh] sm:overflow-x-hidden sm:overflow-y-auto">
        <!-- Spinner -->
        <div v-if="loading" class="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 z-10">
          <Spinner />
        </div>

        <!-- Mensaje si no hay exámenes -->
        <div
          v-else-if="filteredExams.length === 0"
          class="grid content-center gap-4 justify-center min-h-[20vh]"
        >
          <p class="lg:text-[30px] md:text-[25px] text-[20px] text-center">
            No hay exámenes disponibles
          </p>
          <div class="justify-center flex">
            <component :is="AllInboxFilled" class="md:w-20 md:h-20 w-12 h-12 text-sky-500" />
          </div>
        </div>

        <!-- Lista de exámenes -->
        <div v-else class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <CardExam
            v-for="exam in paginatedExams"
            :key="exam.id"
            :exam="exam"
          />
        </div>
      </div>

      <!-- Paginador -->
      <div class="bg-sky-700 rounded-b-lg py-2 justify-center flex gap-2">
        <button
          class="px-3 py-1 rounded bg-sky-700 text-white hover:bg-sky-800 disabled:opacity-50"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          Anterior
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          class="px-3 py-1 rounded border"
          :class="{
            'bg-sky-700 text-white': currentPage === page,
            'hover:bg-sky-200': currentPage !== page,
          }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
        <button
          class="px-3 py-1 rounded bg-sky-700 text-white hover:bg-sky-800 disabled:opacity-50"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ArrowBackFilled, AllInboxFilled } from '@vicons/material';
import Spinner from '@/components/common/Spinner.vue';
import CardExam from '@/components/evaluator/CardExam.vue';

const title = 'Curso de Ejemplo';
const loading = ref(false);
const selectedTab = ref('sinCalificar');

const searchExam = ref('');
const searchEmployee = ref('');
const sortOrder = ref('');

const currentPage = ref(1);
const perPage = 6;

// Simulación de datos
const exams = ref([]);

function fetchExams() {
  loading.value = true;
  setTimeout(() => {
    exams.value = [
      { id: 1, name: 'Examen A', employee: 'Juan', date: '2024-05-01', status: 'sinCalificar' },
      { id: 2, name: 'Examen B', employee: 'Ana', date: '2024-05-05', status: 'calificados' },
      { id: 3, name: 'Examen C', employee: 'Pedro', date: '2024-05-03', status: 'sinCalificar' },
      { id: 4, name: 'Examen D', employee: 'Luis', date: '2024-04-28', status: 'calificados' },
      // Agrega más para probar scroll/paginación
    ];
    loading.value = false;
  }, 700);
}

onMounted(fetchExams);

function goBack() {
  window.history.back();
}

// Filtrado, ordenamiento y paginación
const filteredExams = computed(() => {
  let filtered = exams.value.filter((exam) => exam.status === selectedTab.value);

  if (searchExam.value)
    filtered = filtered.filter((exam) =>
      exam.name.toLowerCase().includes(searchExam.value.toLowerCase())
    );
  if (searchEmployee.value)
    filtered = filtered.filter((exam) =>
      exam.employee.toLowerCase().includes(searchEmployee.value.toLowerCase())
    );
  if (sortOrder.value === 'asc')
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  else if (sortOrder.value === 'desc')
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  return filtered;
});

const totalPages = computed(() =>
  Math.ceil(filteredExams.value.length / perPage)
);

const paginatedExams = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  const end = start + perPage;
  return filteredExams.value.slice(start, end);
});

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
</script>
