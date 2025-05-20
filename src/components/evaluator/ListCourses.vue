<template>
  <div class="h-[100dvh]">
    <!-- Título -->
    <div class="text-center">
      <p class="lg:text-[55px] md:text-[40px] text-[28px] mt-4 text-sky-700">
        Lista de cursos
      </p>
    </div>

    <div class="grid p-4 justify-items-stretch">
      <!-- Buscador -->
      <div class="md:my-8 mb-6">
        <label for="iptSearch">Buscar curso:</label>
        <input
          id="iptSearch"
          class="w-full md:text-xl text-sm py-1 pl-2 focus:border-sky-700 rounded-sm border border-sky-400"
          type="text"
          placeholder="Nombre del curso"
        />
      </div>

      <!-- Tabla simulada con scroll y spinner interno -->
      <div class="border rounded-lg border-sky-800">
        <div class="h-4 bg-sky-700 rounded-t-lg"></div>

        <!-- CONTENEDOR SCROLLABLE DE LA "TABLA" -->
        <div class="relative p-4 overflow-x-auto max-h-[50vh] sm:overflow-x-hidden sm:overflow-y-auto">
          <!-- SPINNER -->
          <div v-if="loading" class="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 z-10">
            <Spinner />
          </div>

          <!-- MENSAJE CUANDO NO HAY CURSOS -->
          <div v-else-if="cursos.length === 0" class="grid content-center gap-4 justify-center min-h-[20vh]">
            <p class="lg:text-[35px] md:text-[30px] text-[25px] pr-5 text-center">
              No hay cursos disponibles o asignados
            </p>
            <div class="justify-center flex">
              <component
                :is="AllInboxFilled"
                class="md:w-25 md:h-25 w-15 h-15 text-sky-500"
              />
            </div>
          </div>

          <!-- CARDS DE CURSOS -->
          <div v-else class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <CardCourse
              v-for="curso in cursos"
              :key="curso.id"
              :id="curso.id"
              :name="curso.name"
            />
          </div>
        </div>

        <!-- PAGINADOR -->
        <div class="bg-sky-700 rounded-b-lg py-2 justify-center flex gap-2">
          <button
            class="px-3 py-1 rounded bg-sky-700 text-white hover:bg-sky-800 disabled:opacity-50"
            :disabled="pagination.currentPage === 1"
            @click="goToPage(pagination.currentPage - 1)"
          >
            Anterior
          </button>
          <button
            v-for="page in pagination.totalPages"
            :key="page"
            class="px-3 py-1 rounded border"
            :class="{
              'bg-sky-700 text-white': pagination.currentPage === page,
              'hover:bg-sky-200': pagination.currentPage !== page,
            }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <button
            class="px-3 py-1 rounded bg-sky-700 text-white hover:bg-sky-800 disabled:opacity-50"
            :disabled="pagination.currentPage === pagination.totalPages"
            @click="goToPage(pagination.currentPage + 1)"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CardCourse from "@/components/evaluator/CardCourse.vue";
import Spinner from "@/components/common/Spinner.vue";
import { AllInboxFilled } from "@vicons/material";

const cursos = ref([]);
const loading = ref(false);
const search = ref("");

const pagination = ref({
  currentPage: 1,
  totalPages: 1,
});

// Simulación de API
function fetchCursos(page = 1) {
  loading.value = true;

  // Aquí llamarías a tu backend real
  setTimeout(() => {
    // Ejemplo: el backend te regresa 5 cursos por página
    const todos = [
      { id: 1, name: "MTI-123.4 Manejo de troquelado" },
      { id: 2, name: "MLA-1234.34.96 Limpieza en area de montacarga" },
      { id: 3, name: "curso 3" },
      { id: 4, name: "curso 4" },
      { id: 5, name: "curso 5" },
      { id: 5, name: "curso 5" },
      { id: 5, name: "curso 5" },
      { id: 5, name: "curso 5" },
    ];

    const perPage = 8;
    const totalPages = Math.ceil(todos.length / perPage);
    const start = (page - 1) * perPage;
    const end = page * perPage;

    cursos.value = todos.slice(start, end);
    pagination.value.currentPage = page;
    pagination.value.totalPages = totalPages;
    loading.value = false;
  }, 700);
}

// Cambio de página
function goToPage(page) {
  if (page < 1 || page > pagination.value.totalPages) return;
  fetchCursos(page);
}

// Inicial
fetchCursos();
</script>
