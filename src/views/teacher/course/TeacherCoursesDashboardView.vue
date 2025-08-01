<template>
  <n-flex vertical class="flex-1">
    <n-space align="center">
      <n-form ref="formRef" @submit.prevent="searchByName">
        <n-form-item label="Buscar curso" class="">
          <n-input placeholder="Nombre del curso" v-model:value="name" />
          <n-button type="primary" attr-type="submit">
            <n-icon :component="SearchOutlined" size="18" />
          </n-button>
        </n-form-item>
      </n-form>
      <n-button type="primary" class="m-auto" @click="handleSort">
        <span> A-Z </span>
        <n-icon :component="sortOrder ? TrendingUpFilled : TrendingDownFilled" size="18" />
      </n-button>
    </n-space>
    <div class="bg-primary-900 mb-4 pt-8 rounded-lg border-3 border-primary-900 grow flex flex-col">
      <div class="bg-white p-4 rounded-b-md grow">
        <n-grid  :cols="2" :x-gap="12" :y-gap="12" item-responsive>
          <n-grid-item v-for="c in courses" :key="c.id" span="2 600:1">
            <SimpleCardItem :title="c?.name" :colorClass="'bg-cyan-600'" :body="c.description" @click="router.push(`courses/details/${c?.id}`)"/>
          </n-grid-item>
        </n-grid>
      </div>
      <n-pagination class="pagination flex-none" :page-count="pagesCount" :on-update:page="handlePaginate" />
    </div>
  </n-flex>
</template>
<script setup>
import { BookFilled, SearchOutlined, TrendingDownFilled, TrendingUpFilled } from '@vicons/material';
import { inject, onMounted, ref } from 'vue';
import { filterMyCourses } from '../../../service/courseService';
import SimpleCardItem from '../../../components/common/listable/SimpleCardItem.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentPath = inject('module');
const breadCrumbItems = inject('breadcrumbItems');
const pageTitle = inject('pageTitle');
pageTitle.value = 'Mis cursos';
breadCrumbItems.value = [{
  icon: BookFilled,
  label: 'Cursos',
  path: '/courses'
}];
currentPath.value = 'courses';
const formRef = ref(null);
const name = ref('');
const sortOrder = ref(true);
const itemsPerPage = 8;
const currentPage = ref(1);
const pagesCount = ref(1);

const courses = ref([]);

const handleSort = () => {
  sortOrder.value = !sortOrder.value;
  fetchCourses();
}

const handlePaginate = (page) => {
  currentPage.value = page;
  fetchCourses();
}

const searchByName = () => {
  currentPage.value = 1;
  fetchCourses();
}

const fetchCourses = async () => {
  await filterMyCourses(
    name.value,
    currentPage.value - 1,
    itemsPerPage,
    sortOrder.value ? 'ASC' : 'DESC'
  ).then(response => {
    const data = response.data;
    courses.value = data.content;
    pagesCount.value = data.totalPages;
  });
}

onMounted(() => { fetchCourses(); });
</script>
