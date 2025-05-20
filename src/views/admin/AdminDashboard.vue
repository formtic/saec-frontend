<template>
  <div class="w-full min-h-screen pt-9">
    <Title title="Panel General" :breadcrumbs="breadcrumb" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-9">
      <Card :icon="renderIcon(HouseFilled)" title="Departamentos" :count="10" />
      <Card
        :icon="renderIcon(PeopleAltFilled)"
        title="Empleados"
        :count="2000"
      />
      <Card :icon="renderIcon(BookFilled)" title="Cursos" :count="100" />
      <Card
        :icon="renderIcon(InsertDriveFileFilled)"
        title="Exámenes"
        :count="3000"
      />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
      <div
        class="w-full lg:col-span-2 p-2.5 border-[#0D5A79] rounded-md border-2 space-y-5"
      >
        <h1 class="text-2xl font-semibold text-gray-900">
          Solicitudes recientes de usuario
        </h1>
        <table
          class="min-w-full divide-y divide-gray-200 text-sm text-center table-fixed"
        >
          <thead>
            <tr>
              <th class="px-4 py-2 font-medium text-gray-500">
                Nombre de usuario
              </th>
              <th class="px-4 py-2 font-medium text-gray-500">Asunto</th>
              <th class="px-4 py-2 font-medium text-gray-500">
                Fecha de solicitud
              </th>
              <th class="px-4 py-2 font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="row in pageData"
              :key="row.id"
              class="hover:bg-gray-50 transition"
            >
              <td class="px-4 py-2.5 text-gray-700">{{ row.name }}</td>
              <td class="px-4 py-2.5 text-gray-700">{{ row.subject }}</td>
              <td class="px-4 py-2.5 text-gray-700">{{ row.date }}</td>
              <td class="px-4 py-2.5 text-gray-700 flex gap-3 justify-center">
                <button
                  class="size-6 flex items-center justify-center cursor-pointer"
                >
                  <BorderColorFilled />
                </button>
                <button
                  class="size-6 flex items-center justify-center cursor-pointer"
                >
                  <DeleteFilled />
                </button>
                <button
                  class="size-6 flex items-center justify-center cursor-pointer"
                >
                  <MoreHorizTwotone />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-center mt-4 shrink-0">
          <nav
            class="flex items-center space-x-1 bg-[#0D5A79] text-white px-3 py-2 rounded-md w-full justify-center"
          >
            <button
              @click="prevPage"
              :disabled="page === 1"
              class="size-8 flex items-center justify-center rounded-full border border-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <KeyboardArrowLeftFilled />
            </button>
            <template v-for="(p, i) in paginationRange" :key="i">
              <span
                v-if="p === '...'"
                class="size-8 flex items-center justify-center"
                >...</span
              >
              <button
                v-else
                @click="page = p"
                :class="[
                  'size-8 flex items-center justify-center rounded',
                  page === p
                    ? 'bg-blue-400 text-white font-bold'
                    : 'hover:bg-blue-400/50 transition',
                ]"
              >
                {{ p }}
              </button>
            </template>
            <button
              @click="nextPage"
              :disabled="page >= totalPages"
              class="size-8 flex items-center justify-center rounded-full border border-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <KeyboardArrowRightFilled />
            </button>
          </nav>
        </div>
      </div>
      <div class="w-full h-full">
        <div class="p-1">
          <div
            class="bg-[#0D5A79] text-white px-4 py-2 text-center font-semibold rounded-t-md"
          >
            Semana {{ currentWeek }}
          </div>
          <div class="p-4 px-5 shadow-lg rounded-b-md">
            <div class="flex justify-between items-center mb-4">
              <button
                @click="prevMonth"
                class="size-5 text-blue-800 hover:underline"
              >
                <KeyboardArrowLeftFilled />
              </button>
              <h2 class="font-semibold text-gray-700">
                {{ months[currentMonth] }} {{ currentYear }}
              </h2>
              <button
                @click="nextMonth"
                class="size-5 text-blue-800 hover:underline"
              >
                <KeyboardArrowRightFilled />
              </button>
            </div>
            <div
              class="grid grid-cols-7 text-xs text-center text-gray-600 mb-2"
            >
              <!-- Cabecera de días -->
              <div v-for="day in days" :key="day" class="mb-2">{{ day }}</div>

              <!-- Espacios vacíos antes del primer día del mes -->
              <div v-for="n in firstDayOfMonth" :key="'empty-' + n"></div>

              <!-- Días del mes -->
              <div
                v-for="day in daysInMonth"
                :key="day"
                @click="selectDate(day)"
                class="cursor-pointer py-2 rounded-md hover:bg-blue-100"
                :class="{
                  'bg-blue-900 text-white font-bold': isToday(day),
                  'bg-blue-200': isSelected(day),
                }"
              >
                {{ day }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-5 w-full pt-5 rounded-lg border-2 border-[#0D5A79] px-1 py-3 flex flex-col items-center justify-center max-h-[227px]"
        >
          <h1 class="text-xl font-bold mb-3 text-center">
            Evaluaciones próximas del mes
          </h1>
          <div class="overflow-y-auto w-full">
            <div
              v-if="filteredEvaluations.length === 0"
              class="text-gray-500 text-sm flex items-center justify-center min-h-[200px] overflow-y-hidden"
            >
              No hay evaluaciones programadas para este mes.
            </div>
            <div
              v-for="(evalItem, index) in filteredEvaluations"
              :key="index"
              class="flex w-full items-start gap-3 border-l-4 border-[#0D5A79] pl-3 py-2 mb-2 bg-gray-50 rounded-lg"
            >
              <div
                class="text-center bg-blue-800 text-white px-2 py-1 rounded-full"
              >
                <div class="text-xs font-bold">
                  {{ formatDay(evalItem.date) }}
                </div>
                <div class="text-sm">{{ formatMonth(evalItem.date) }}</div>
              </div>
              <div class="text-sm text-gray-700 leading-snug">
                <strong>{{ evalItem.code }}</strong> {{ evalItem.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Title from "@/components/common/Title.vue";
import Card from "@/components/admin/Card.vue";
import {
  DashboardFilled,
  ArrowRightFilled,
  HouseFilled,
  PeopleAltFilled,
  BookFilled,
  InsertDriveFileFilled,
  KeyboardArrowLeftFilled,
  KeyboardArrowRightFilled,
  BorderColorFilled,
  DeleteFilled,
  MoreHorizTwotone,
} from "@vicons/material";
import renderIcon from "@/utils/RenderIcon.js";
import { ref, computed } from "vue";

const breadcrumb = [
  { label: "Panel General", icon: renderIcon(DashboardFilled) },
];

const today = new Date();
const selectedDate = ref(today);
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

const days = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const getWeekNumber = (date) => {
  const firstJan = new Date(date.getFullYear(), 0, 1);
  const pastDays = (date - firstJan + 86400000) / 86400000;
  return Math.ceil((pastDays + firstJan.getDay()) / 7);
};
const currentWeek = computed(() => getWeekNumber(selectedDate.value));

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const firstDayOfMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const selectDate = (day) => {
  selectedDate.value = new Date(currentYear.value, currentMonth.value, day);
};

const isToday = (day) => {
  const d = new Date(currentYear.value, currentMonth.value, day);
  return d.toDateString() === new Date().toDateString();
};

const isSelected = (day) => {
  const d = new Date(currentYear.value, currentMonth.value, day);
  return d.toDateString() === selectedDate.value.toDateString();
};
const randomNames = [
  "Ana García",
  "Luis Torres",
  "María López",
  "Carlos Díaz",
  "Valentina Ruiz",
  "Miguel Hernández",
  "Lucía Castro",
  "Javier Mendoza",
  "Camila Vargas",
  "Diego Rojas",
  "Sofía Paredes",
  "Andrés Salazar",
  "Isabella León",
  "Mateo Cordero",
  "Gabriela Navarro",
  "Sebastián Ortega",
  "Paula Muñoz",
  "Tomás Reyes",
  "Daniela Silva",
  "Emilio Aguirre",
];

const getRandomDate = (
  start = new Date(2025, 0, 1),
  end = new Date(2025, 11, 11)
) => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split("T")[0];
};

const data = ref(
  Array.from({ length: 100 }, (_, i) => ({
    name: randomNames[Math.floor(Math.random() * randomNames.length)],
    subject: "Solicitud de curso",
    date: getRandomDate(),
    id: i + 1,
  }))
);

const page = ref(1);
const pageSize = ref(10);

const totalPages = computed(() =>
  Math.ceil(data.value.length / pageSize.value)
);

const pageData = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return data.value.slice(start, start + pageSize.value);
});

const prevPage = () => {
  if (page.value > 1) page.value--;
};

const nextPage = () => {
  if (page.value * pageSize.value < data.value.length) page.value++;
};

const paginationRange = computed(() => {
  const total = totalPages.value;
  const current = page.value;
  const delta = 2;
  const range = [];
  const rangeWithDots = [];

  let l = Math.max(2, current - delta);
  let r = Math.min(total - 1, current + delta);

  range.push(1);
  if (l > 2) rangeWithDots.push("...");
  for (let i = l; i <= r; i++) rangeWithDots.push(i);
  if (r < total - 1) rangeWithDots.push("...");
  if (total > 1) rangeWithDots.push(total);

  return [...range, ...rangeWithDots];
});

const evaluations = ref([
  {
    date: "2025-02-28",
    code: "MTA-106 BIO-002",
    description: "Procedimiento de análisis de pruebas biológicas",
  },
  {
    date: "2025-03-10",
    code: "QMC-205 QUI-003",
    description: "Evaluación semestral de química avanzada",
  },
  {
    date: new Date().toISOString().split("T")[0], // Hoy
    code: "DEV-001",
    description: "Evaluación de prueba del día actual",
  },
  {
    date: new Date().toISOString().split("T")[0], // Hoy
    code: "DEV-001",
    description: "Evaluación de prueba del día actual",
  },
  {
    date: new Date().toISOString().split("T")[0], // Hoy
    code: "DEV-001",
    description: "Evaluación de prueba del día actual",
  },
  {
    date: new Date().toISOString().split("T")[0], // Hoy
    code: "DEV-001",
    description: "Evaluación de prueba del día actual",
  },
  {
    date: new Date().toISOString().split("T")[0], // Hoy
    code: "DEV-001",
    description: "Evaluación de prueba del día actual",
  },
  {
    date: new Date().toISOString().split("T")[0], // Hoy
    code: "DEV-001",
    description: "Evaluación de prueba del día actual",
  },
]);

const filteredEvaluations = computed(() => {
  return evaluations.value.filter((ev) => {
    const evDate = new Date(ev.date);
    return (
      evDate.getMonth() === currentMonth.value &&
      evDate.getFullYear() === currentYear.value
    );
  });
});

const formatDay = (dateStr) => {
  const d = new Date(dateStr);
  return d.getDate();
};

const formatMonth = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleString("es-ES", { month: "short" }).toUpperCase();
};
</script>
