<template>
<n-config-provider :theme-overrides="themeOverrides">
  <div class="px-4">
    <div class="admin-header pt-4 pb-4 w-full">
      <n-breadcrumb class="admin-breadcumb">
        <n-breadcrumb-item>
          <n-icon :component="HomeFilled" />
          Departamentos
        </n-breadcrumb-item>
      </n-breadcrumb>
      <h1 class="admin-title">Departamentos</h1>
    </div>
    
    <n-flex class="items-center gap-1">
      <n-form @submit.prevent="searchByName">
        <n-form-item label="Buscar departamento" class="w-100">
          <n-input placeholder="Buscar por nombre" v-model:value="model.name" />
          <n-button type="primary" @click="searchByName">
            <n-icon :component="SearchFilled" size="18"></n-icon>
          </n-button>
        </n-form-item>
      </n-form>
      <n-button type="primary" @click="toggleSortOrder" class="m-auto">
        <span>A-Z</span>
        <n-icon :component="model.sortAscending ? TrendingUpFilled : TrendingDownFilled" size="18"></n-icon>
      </n-button>
      <n-button type="primary" style="margin-left: auto;" @click="createNewDepartment()">
        Nuevo departamento
      </n-button>
    </n-flex>
    
    <div class="w-full pt-4 pb-4 bg-primary-900 mb-4">
    </div>

    <n-grid cols="1 400:1 640:2 :2 1024:4" x-gap="12" y-gap="12">
      <n-grid-item v-for="d in departments" :key=d.id>
        <SimpleCardItem
          :title="d.name"
          :colorClass="'bg-cyan-600'"
          @click="router.push({ name: 'updateDepartment', params: { id: d.id } })"
        />
      </n-grid-item>
    </n-grid>

    <n-pagination class="pagination" v-model:page="model.currentPage" :page-count="model.pagesCount" :on-update:page="paginate"></n-pagination>
  </div>
</n-config-provider>

</template>
<script setup>
import SimpleCardItem from '../../components/common/listable/SimpleCardItem.vue';
import { HomeFilled, SearchFilled, TrendingUpFilled, TrendingDownFilled } from '@vicons/material';
import {
    NConfigProvider,
    NBreadcrumb,
    NBreadcrumbItem,
    NForm,
    NFormItem,
    NInput,
    NButton,
    NIcon,
    NGrid,
    NGridItem,
    NPagination
} from 'naive-ui';
import themeOverrides from '../../theme/theme.js';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { filter } from '../../service/DepartmentService.js';
const router = useRouter();
const departments = ref([]);
const itemsPerPage = 12;
const toggleSortOrder = () => {
    model.value.sortAscending = !model.value.sortAscending;
    findDepartmentsByFilter();
}

const paginate = (page) => {
  model.value.currentPage = page;
  findDepartmentsByFilter();
}

const searchByName = () => {
  model.value.currentPage = 1;
  findDepartmentsByFilter();
}

const findDepartmentsByFilter = async () => {
  await filter(
    model.value.name ?? '',
    model.value.currentPage -1,
    itemsPerPage,
    model.value.sortAscending ? 'ASC' : 'DESC'
  ).then(response => {
    const data = response.data;
    departments.value = data.content;
    model.value.pagesCount = data.totalPages;
  });
}


const createNewDepartment = () => {
    router.push('/admin/departments/create')
}

const model = ref({
    name: null,
    sortAscending: true,
    currentPage: 1,
    pagesCount: 1
});

onMounted(() => {
    findDepartmentsByFilter();
});

</script>