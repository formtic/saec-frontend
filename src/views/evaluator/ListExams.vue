<template>
  <div>
    <!-- Título -->
    <div class="grid grid-cols-2">
        <button><component :is="ArrowBackFilled" class="md:w-15 md:h-15 w-10 h-10 text-neutral-900"/></button>
      <p class="sm:text-[20px] lg:text-[55px] md:text-[40px] mt-4 text-sky-700">
        Lista de exámenes
      </p>
    </div>

    <!-- Filtros -->
    <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-6">
      <div class="grid px-4 py-2">
        <label for="iptSearchExam">Buscar examen:</label>
        <input
          id="iptSearchExam"
          class="focus:border-sky-700 rounded-sm border py-1 pl-2"
          type="text"
          placeholder="Nombre de examen"
        />
      </div>
      <div class="grid px-4 py-2">
        <label for="iptSearchEmployee">Buscar empleado:</label>
        <input
          id="iptSearchEmployee"
          class="focus:border-sky-700 rounded-sm border py-1 pl-2"
          type="text"
          placeholder="Nombre de empleado"
        />
      </div>
      <div class="grid px-4 py-2 md:col-span-2 lg:col-span-1">
        <label for="iptSearchDate">Fecha:</label>
        <select
          id="iptSearchDate"
          class="focus:border-sky-700 rounded-sm border py-1 pl-2"
        >
          <option disabled selected>Ordenar por fecha</option>
          <option value="asc">Más antiguo</option>
          <option value="desc">Más reciente</option>
        </select>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex justify-center space-x-4 mb-4">
      <button
        @click="selectedTab = 'sinCalificar'"
        :class="tabButtonClass('sinCalificar')"
      >
        Exámenes sin calificar
      </button>
      <button
        @click="selectedTab = 'calificados'"
        :class="tabButtonClass('calificados')"
      >
        Exámenes calificados
      </button>
    </div>

    <!-- Contenedor de tarjetas con paginación -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
      <CardExam
        v-for="exam in paginatedData"
        :key="exam.id"
        :exam="exam"
      />
    </div>

    <!-- Paginación -->
    <div class="flex justify-center mt-6 space-x-2">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="paginationButtonClass(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from "vue";
import CardExam from "@/components/evaluator/CardExam.vue";
import {ArrowBackFilled} from "@vicons/material";

const selectedTab = ref('sinCalificar');
const currentPage = ref(1);
const examsPerPage=4;

const allExams = ref([
  // Simulación de datos
  { id: 1, title: 'MIT-123-123454 Troquelado de limpieza',employee:"Adolfo Lopez Mateo", estado: 'sinCalificar',date:"01/May/2025" },
  { id: 2, title: 'MOR-122.1 Gerente de produccion',employee:"Edgar Alan Poe", estado: 'calificados' ,date:"01/May/2025" },
  { id: 3, title: 'ALM-105 Movimiento de materia prima y producto terminado',employee:"Felipe Cadenas Gonzales", estado: 'sinCalificar',date:"01/May/2025"  },
  { id: 4, title: 'MIT-106.02.03.5 Soluten pvc manometro flexible MITE-106.04.2 Ensamble de tras/cuarto vias con tubo de extension',employee:"Edar alan Perez Mendez", estado: 'sinCalificar',date:"01/May/2025"  },
  { id: 5, title: 'Examen E',employee:"Juan Jose Estrada Benitez", estado: 'calificados',date:"01/May/2025"  },
  { id: 6, title: 'MPC-109.3 Buenas practicas de documentacion',employee:"Manuel flores ruiz", estado: 'sinCalificar' },
  { id: 7, title: 'Examen G',employee:"Jovani de Jesus Ahumada Martinez", estado: 'calificados',date:"01/May/2025"  },
  { id: 8, title: 'Examen H',employee:"Joana Andrea Marquina Hernandez", estado: 'sinCalificar',date:"01/May/2025"  },
]);

const filteredExams = computed(() =>
  allExams.value.filter((exam) => exam.estado === selectedTab.value)
);

const totalPages = computed(() =>
  Math.ceil(filteredExams.value.length / examsPerPage)
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * examsPerPage;
  return filteredExams.value.slice(start, start + examsPerPage);
});

function tabButtonClass(tab) {
  return [
    'px-4 py-2 rounded-md border',
    selectedTab.value === tab
      ? 'bg-sky-700 text-white'
      : 'bg-white text-sky-700 border-sky-700 hover:bg-sky-100',
  ].join(' ');
}

function paginationButtonClass(page) {
  return [
    'px-3 py-1 rounded-md border',
    currentPage.value === page
      ? 'bg-sky-700 text-white'
      : 'bg-white text-sky-700 border-sky-700 hover:bg-sky-100',
  ].join(' ');
}
</script>
