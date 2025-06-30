<template>
  <div style="padding-left: 1rem; padding-right: 1rem">
    <div class="reviewer-header">
      <n-breadcrumb class="reviewer-breadcrumb">
        <n-breadcrumb-item>
          <n-icon :component="BookFilled" />
          Cursos
        </n-breadcrumb-item>
      </n-breadcrumb>
      <h1 class="reviewer-title">Cursos</h1>
    </div>

    <n-space vertical size="large">
      <n-layout>
        <n-form-item label="Nombre curso">
          <n-input type="text" placeholder="Ingrese curso" />
        </n-form-item>
      </n-layout>
      <n-layout>
        <n-infinite-scroll
          style="
            height: 350px;
            border-right: 1px solid black;
            border-top: 20px solid #0d5a79;
            border-radius: 10px 10px 0px 0px;
          "
        >
          <n-grid :cols="3" :x-gap="16" :y-gap="16" style="margin-top: 1rem">
            <n-grid-item v-for="curso in data" :key="curso.id">
              <n-card
                @click="goToExamenes(curso.id,curso.name)"
                hoverable
                style="height: 100px; border-left: 4px solid blue"
                ><p class="multi-ellipsis">{{ curso.name }}</p></n-card
              >
            </n-grid-item>
          </n-grid>
        </n-infinite-scroll>
        <n-pagination
          :page-slot="8"
          v-model:page="page"
          :page-count="100"
          style="
            background-color: #0d5a79;
            padding: 8px;
            margin-top: 10px;
            justify-content: center;
          "
        />
      </n-layout>
    </n-space>
  </div>
</template>

<script scoped>
import { BookFilled } from "@vicons/material";
import {
  NSpace,
  NBreadcrumb,
  NBreadcrumbItem,
  NIcon,
  NLayout,
  NInput,
  NFormItem,
  NCard,
  NGrid,
  NGridItem,
  NInfiniteScroll,
  NPagination,
} from "naive-ui";
import { defineComponent, h } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    NBreadcrumb,
    NBreadcrumbItem,
    NSpace,
    NIcon,
    BookFilled,
    NLayout,
    NInput,
    NFormItem,
    NCard,
    NGrid,
    NGridItem,
    NInfiniteScroll,
    NPagination,
  },
  setup() {
    const data = [
      { id: 1, name: "Inyección" },
      { id: 2, name: "Almacén" },
      { id: 3, name: "Calidad" },
      { id: 4, name: "Mantenimiento" },
      { id: 5, name: "Producción" },
      { id: 6, name: "Gestor de limpieza" },
      { id: 7, name: "Gestor de area en mantenimiento industrial para IPM" },
      { id: 8, name: "Gestor de calidad" },
      { id: 9, name: "Gestor de inyección" },
      { id: 10, name: "Gestor de almacén" },
      { id: 11, name: "Gestor de mantenimiento" },
      { id: 12, name: "Gestor de producción" },
      { id: 13, name: "Gestor de calidad" },
      { id: 14, name: "Gestor de inyección" },
      { id: 15, name: "Gestor de almacén" },
      { id: 16, name: "Gestor de mantenimiento" },
      { id: 17, name: "Gestor de producción" },
    ];
    const router = useRouter();
    const goToExamenes = (id,title) => {
      router.push({name:'course-exams',params:{id,title}});
    };
    return {
      BookFilled,
      data,
      goToExamenes,
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

.multi-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
}
</style>
