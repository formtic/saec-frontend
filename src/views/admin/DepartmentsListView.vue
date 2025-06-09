<template>
    <div class="px-4">
        <div class="admin-header pt-4 pb-4 w-full">
            <n-breadcrumb class="admin-breadcrumb">
                <n-breadcrumb-item>
                    <n-icon :component="HomeFilled" />
                    Departamentos
                </n-breadcrumb-item>
            </n-breadcrumb>
            <h1 class="admin-title">Departamentos</h1>
        </div>
        <n-config-provider :theme-overrides="themeOverrides">
            <n-flex class="items-center gap-1">
                <n-form @submit.prevent="findDepartmentsByFilter">
                    <n-form-item label="Buscar departamento" class="w-100">
                        <n-input placeholder="Buscar por nombre" v-model:value="nameFilter" />
                        <n-button type="primary" @click="findDepartmentsByFilter">
                            <n-icon :component="SearchFilled" size="18"></n-icon>
                        </n-button>
                    </n-form-item>
                </n-form>
                <n-button type="primary" @click="toggleSortOrder" class="m-auto">
                    <span>A-Z</span>
                    <n-icon :component="sortAscending ? TrendingUpFilled : TrendingDownFilled" size="18"></n-icon>
                </n-button>
                <n-button type="primary" style="margin-left: auto;" @click="findAllDepartments">
                    Nuevo departamento
                </n-button>
            </n-flex>
        </n-config-provider>
        <div class="w-full pt-4 pb-4 bg-primary-900 mb-4">
        </div>
        <n-grid cols="1 400:1 640:2 :2 1024:4" x-gap="12" y-gap="12">
            <n-grid-item v-for="d in departments" :key=d.id>
                <SimpleCardItem :title="d.name" :colorClass="'bg-cyan-600'" @click="console.log('pene')" />
            </n-grid-item>
        </n-grid>
    </div>
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
    NGridItem
} from 'naive-ui';
import themeOverrides from '../../theme/filterInputsTheme.js';
import { onMounted, ref } from 'vue';
import { findAll } from '../../service/DepartmentService.js';
const sortAscending = ref(true);
const departments = ref([]);
const nameFilter = ref('');
const toggleSortOrder = () => {
    sortAscending.value = !sortAscending.value;
}

const findAllDepartments = async () => {
    departments.value = (await findAll()).data;
}

const findDepartmentsByFilter = () => {
    console.log(nameFilter.value);
}

onMounted(() => {
    findAllDepartments();
});

</script>