<template>
    <n-config-provider :theme-overrides="themeOverrides">
        <div class="px-4">
            <div class="admin-header pt-4 pb-4 w-full">
                <n-breadcrumb class="admin-breadcrumb">
                    <n-breadcrumb-item>
                        <n-icon :component="CasesOutlined" />
                        Puestos
                    </n-breadcrumb-item>
                </n-breadcrumb>
                <h1 class="admin-title">Puestos</h1>
            </div>
            <n-flex class="items-center gap-1">
                <n-form @submit.prevent="searchByName">
                    <n-form-item label="Buscar puesto" class="w-100">
                        <n-input placeholder="Buscar por nombre" v-model:value="model.name" />
                        <n-button type="primary" @click="searchByName">
                            <n-icon :component="SearchFilled" size="18" />
                        </n-button>
                    </n-form-item>
                </n-form>
                <n-button type="primary" class="m-auto" @click="toggleSortOrder">
                    <span>A-Z</span>
                    <n-icon :component="model.sortAscending ? TrendingUpFilled : TrendingDownFilled"></n-icon>
                </n-button>
                <n-button type="primary" style="margin-left: auto;" @click="router.push('/admin/jobs/create')">
                    Nuevo puesto
                </n-button>
            </n-flex>
            <div class="w-full pt-4 pb-4 bg-primary-900 mb-4">
            </div>
            <n-grid cols="1 400:1 640:2 :2 1024:4" x-gap="12" y-gap="12">
                <n-grid-item v-for="j in jobs" :key=j.id>
                    <SimpleCardItem :title="j.name" :colorClass="'bg-cyan-600'" @click="router.push({ name: 'updateJob', params: { id: j.id } })"/>
                </n-grid-item>
            </n-grid>
            <n-pagination class="pagination" v-model:page="model.currentPage" :page-count="model.pagesCount" :on-update:page="paginate"/>
        </div>

    </n-config-provider>
</template>
<script setup>
import { CasesOutlined, SearchFilled, TrendingDownFilled, TrendingUpFilled } from '@vicons/material';
import { onMounted, ref } from 'vue';
import themeOverrides from '../../theme/theme';
import SimpleCardItem from '../../components/common/listable/SimpleCardItem.vue';
import { filter } from '../../service/jobService.js';
import { useRouter } from 'vue-router';
import {
    NConfigProvider,
    NBreadcrumb,
    NFlex,
    NForm,
    NFormItem,
    NInput,
    NButton,
    NIcon,
    NGrid,
    NGridItem,
    NPagination
} from 'naive-ui';

const router = useRouter();
const jobs = ref([
    {
        id: '123456',
        name: "Job 1"
    },
    {
        id: '123455',
        name: "Job 2"
    },
]);
const itemsPerPage = 12;

const toggleSortOrder = () => {
    model.value.sortAscending = !model.value.sortAscending;
    findJobsByFilter();
}

const paginate = (page) => {
    model.value.currentPage = page;
    findJobsByFilter();
}

const searchByName = () => {
    model.value.currentPage = 1;
    findJobsByFilter();
}



const model = ref({
    name: null,
    sortAscending: true,
    currentPage: 1,
    pagesCount: 1
});

const findJobsByFilter = async () => {
    await filter(
        model.value.name ?? '',
        model.value.currentPage - 1,
        itemsPerPage,
        model.value.sortAscending ? 'ASC' : 'DESC'
    ).then(response => {
        const data = response.data;
        jobs.value = data.content;
        model.value.pagesCount = data.totalPages;
    });
}

onMounted(() => {
    findJobsByFilter();
});
</script>