<template>
    <div class="h-lvh">
        <n-layout has-sider class="h-full">
            <n-layout-sider :width="240" :collapsed="hideSider" collapse-mode="width" collapsed-width="64">
                <n-flex vertical class="h-full">
                    <n-flex class="p-3" justify="space-between">
                        <img :src="logo" alt="Logo">
                        <n-button quaternary color="none" @click="handleCollapse(!hideSider)">
                            <template #icon>
                                <n-icon :component="MenuFilled" color="#fff" :size="32" />
                            </template>
                        </n-button>
                    </n-flex>
                    <n-menu :options="topMenuOptions" :collapsed="hideSider" :collapsed-width="64"
                        :collapsed-icon-size="25" :value="topMenuValue" :on-update:value="handleNavigate" />
                    <div class="mt-auto">
                        <div class="w-full px-2">
                            <n-divider />
                        </div>
                        <n-menu :options="bottomMenuOptions" :collapsed="hideSider" :collapse-width="64"></n-menu>
                    </div>
                </n-flex>
            </n-layout-sider>
            <n-layout-content>
                <div class="px-4">
                    <n-flex justify="space-between" align="center" class="pt-4 pb-4 w-full">
                        <n-breadcrumb>
                            <n-breadcrumb-item v-for="(item, index) in breadcrumbOptions" key="path"
                                @click="handleBreadCrumbNavigate(item.path, index)">
                                <n-icon :component="item.icon" />
                                {{ item.label }}
                            </n-breadcrumb-item>
                        </n-breadcrumb>
                        <h1 class="admin-title">
                            {{ title }}
                        </h1>
                    </n-flex>
                </div>
                <router-view></router-view>
            </n-layout-content>
        </n-layout>

    </div>
</template>

<script setup>
import { BookFilled, DashboardFilled, LogOutFilled, MenuFilled, PersonFilled } from '@vicons/material';
import logo from '../../../assets/svg/logoDarkmode.svg';
import { NLayout, NLayoutSider, NLayoutContent, NIcon } from 'naive-ui';
import { ref, h, provide } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const hideSider = ref(false);
const topMenuValue = ref('dashboard');
const title = ref('Panel general')
const breadcrumbOptions = ref([
    {
        icon: DashboardFilled,
        label: 'Panel general',
        path: '/'
    }
]);

provide('module', topMenuValue);
provide('pageTitle', title)
const renderIcon = (icon) => {
    return () => h(NIcon, null, { default: () => h(icon) });
};

const topMenuOptions = [
    { label: 'Panel', key: 'dashboard', icon: renderIcon(DashboardFilled) },
    { label: 'Cursos', key: 'courses', icon: renderIcon(BookFilled) }
];

const bottomMenuOptions = [
    { label: 'Perfil', icon: renderIcon(PersonFilled) },
    { label: 'Cerrar sesión', icon: renderIcon(LogOutFilled) }
]

const handleCollapse = (collapse) => {
    hideSider.value = collapse;
}

const handleNavigate = (key, item) => {
    router.push(`/teacher/${key}`);
    topMenuValue.value = key;
}

const handleBreadCrumbNavigate = (path, index) => {
    if(index !== 0) {
        router.push(`teacher/${path}`);        
    }
}


</script>