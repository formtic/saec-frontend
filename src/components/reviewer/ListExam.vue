<template>
  <div style="padding-left: 1rem; padding-right: 1rem">
    <!-- CABECERA -->
    <div class="reviewer-header">
      <n-breadcrumb class="reviewer-breadcrumb">
        <n-breadcrumb-item @click="goBack">
          <n-icon :component="BookFilled" />
          Cursos
        </n-breadcrumb-item>
        <n-breadcrumb-item>
          <n-icon :component="DescriptionFilled" />
          examenes
        </n-breadcrumb-item>
      </n-breadcrumb>
      <h1 class="reviewer-title">Lista de examenes</h1>
    </div>

    <n-space vertical size="large">
      <!-- layout para filtros y busqueda -->
      <n-layout>
        <n-grid :x-gap="12" :cols="3">
          <n-gi>
            <n-form-item label="Nombre examen">
              <n-input-group>
                <n-input type="text" placeholder="Ingrese examen" />
                <n-button type="info"
                  ><template #icon
                    ><n-icon><SearchRound /></n-icon></template
                ></n-button>
              </n-input-group>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="Buscar empleado">
              <n-input-group>
                <n-input type="text" placeholder="Nombre de empleado" />
                <n-button type="info"
                  ><template #icon
                    ><n-icon><SearchRound /></n-icon></template
                ></n-button>
              </n-input-group>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="Ordenar por fecha">
              <n-select :options="options" placeholder="Seleccionar orden" />
            </n-form-item>
          </n-gi>
        </n-grid>
      </n-layout>

      <!-- contenido -->
      <n-layout
        style="
          margin-bottom: 15px;
          border-left: 1px solid #0369a1;
          border-right: 1px solid #0369a1;
          border-radius: 10px;
        "
      >
        <n-space justify="space-around" style="background-color: #0d5a79; padding-top: 8px; padding-bottom: 8px;">
          <n-button text type="activeTab === 'sinCalificar' ? 'info' : 'default'" @click="showSinCalificar" style="color: white; font-size: 15px"
            >Sin calificar</n-button
          >
          <n-button :type="activeTab === 'calificados' ? 'info' : 'default'" @click="showCalificados" text style="color: white; font-size: 15px"
            >Calificados</n-button
          >
        </n-space>
        <n-infinite-scroll style="height: 350px; padding-top: 10px">
          <n-grid
            :cols="3"
            :x-gap="6"
            :y-gap="6"
            style="width: 99%; padding-left: 4px"
          >
            <n-gi v-for="curso in filteredData">
              <n-card hoverable style="height: 80px">
                {{ curso.title }}
              </n-card>
            </n-gi>
          </n-grid>
        </n-infinite-scroll>
        <n-layout
          style="
            background-color: #0d5a79;
            display: flex;
            justify-content: center;
            padding-top: 15px;
            padding-bottom: 15px;
          "
        >
          <n-pagination :page-count="100" />
        </n-layout>
      </n-layout>
    </n-space>
  </div>
</template>

<script scoped>
import { ref, computed, onMounted, defineComponent } from "vue";
import {
  ArrowBackFilled,
  AllInboxFilled,
  BookFilled,
  DescriptionFilled,
  SearchRound,
} from "@vicons/material";
import {
  NGrid,
  NGi,
  NGridItem,
  NCard,
  NSpace,
  NButton,
  NBreadcrumb,
  NBreadcrumbItem,
  NLayout,
  NInput,
  NFormItem,
  NInfiniteScroll,
  NPagination,
  NSelect,
  NInputGroup,
  NIcon,
} from "naive-ui";
import Spinner from "@/components/common/Spinner.vue";
import CardExam from "@/components/reviewer/CardExam.vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: {
    NGrid,
    NGi,
    NInputGroup,
    NCard,
    NSpace,
    NButton,
    NBreadcrumb,
    NBreadcrumbItem,
    BookFilled,
    ArrowBackFilled,
    AllInboxFilled,
    DescriptionFilled,
    NLayout,
    NInput,
    NFormItem,
    NInfiniteScroll,
    NPagination,
    NSelect,
    NGridItem,
    NIcon,
    Spinner,
    CardExam,
    SearchRound,
  },
  setup() {
    const route = useRoute();

    const activeTab = ref("sinCalificar");
    const filteredData = computed(() => {
      return activeTab.value === "sinCalificar" ? data : dataSin;
    });
    function showSinCalificar() {
      activeTab.value = "sinCalificar";
    }

    function showCalificados() {
      activeTab.value = "calificados";
    }

    // datos de simulacion
    const data = [
      {
        id: 1,
        title: "Examen A",
        employee: "Juan",
        date: "2024-05-01",
      },
      {
        id: 2,
        title: "Examen B",
        employee: "Ana",
        date: "2024-05-05",
      },
      {
        id: 3,
        title: "Examen C",
        employee: "Pedro",
        date: "2024-05-03",
      },
      {
        id: 4,
        title: "Examen D",
        employee: "Luis",
        date: "2024-04-28",
      },
      {
        id: 5,
        title: "MIT-123.07 Troquelado para mancuarnas",
        employee: "Pedro",
        date: "2024-05-03",
      },
      {
        id: 6,
        title: "Examen",
        employee: "Pedro",
        date: "2024-05-03",
      },
      {
        id: 7,
        title: "Examen",
        employee: "Pedro",
        date: "2024-05-03",
      },
      {
        id: 8,
        title: "Examen",
        employee: "Pedro",
        date: "2024-05-03",
      },
      {
        id: 9,
        title: "Examen",
        employee: "Pedro",
        date: "2024-05-03",
      },
      {
        id: 10,
        title: "Examen",
        employee: "Pedro",
        date: "2024-05-03",
      },
      {
        id: 11,
        title: "Examen",
        employee: "Pedro",
        date: "2024-05-20",
      },
    ];
    const dataSin = [
      {
        id: 1,
        title: "Examen",
        employee: "Pedro",
        date: "2024-05-20",
        score: "10",
      },
      {
        id: 2,
        title: "Examen A",
        employee: "Jose",
        date: "2024-05-20",
        score: "9",
      },
      {
        id: 3,
        title: "Examen A",
        employee: "Ana",
        date: "2024-05-20",
        score: "10",
      },
    ];
    const options = [
      { label: "Más antiguo", value: "asc" },
      { label: "Más reciente", value: "desc" },
    ];

    // regresar a vista cursos
    const router = useRouter();
    function goBack() {
      router.back();
    }

    const totalPages = 5;

    return {
      data,
      dataSin,
      filteredData,
  activeTab,
  showSinCalificar,
  showCalificados,
      DescriptionFilled,
      BookFilled,
      options,
      SearchRound,
      goBack,
    };
  },
});
</script>

<style scoped>
.reviewer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reviewer-breadcrumb {
  display: flex;
}

.reviewer-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: #0d5a79;
}
</style>
