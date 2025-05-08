<template>
    <div class="flex">
        <Sidebar :top-menu-options="topMenuOptions" :bottom-menu-options="bottomMenuOptions" :on-menu-select="handleMenuClick" />
        <main class="flex-grow h-screen overflow-y-auto">
            <router-view />
        </main>
    </div>
</template>

<script setup>
    import Sidebar from '@/components/common/Sidebar.vue';
    import  { DashboardFilled, BookFilled, PeopleAltFilled, HomeFilled, PersonFilled, LogOutFilled } from '@vicons/material';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    function renderIcon(icon) {
        return icon;
    }

    const topMenuOptions = [
        { label: 'Panel General', key: 'dashboard', icon: renderIcon(DashboardFilled) },
        { label: 'Cursos', key: 'courses', icon: renderIcon(BookFilled) },
        { label: 'Empleados', key: 'employees', icon: renderIcon(PeopleAltFilled) },
        { label: 'Departamentos', key: 'departments', icon: renderIcon(HomeFilled) }

    ]

    const bottomMenuOptions = [
        { label: 'Perfil', key: 'profile', icon: renderIcon(PersonFilled) },
        { label: 'Cerrar Sesión', key: 'logout', icon: renderIcon(LogOutFilled) }
    ];

    function handleMenuClick(key){
        switch (key) {
            case 'dashboard': router.push('/admin'); break;
            case 'courses': router.push('/admin/courses'); break;
            case 'employees': router.push('/admin/employees'); break;
            case 'departments': router.push('/admin/departments'); break;
            case 'profile': router.push('/admin/profile'); break;
            case 'logout': router.push('/'); break;
        }
    }
</script>