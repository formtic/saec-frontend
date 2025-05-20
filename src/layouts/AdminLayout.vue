<template>
    <div class="flex flex-col h-screen">
        <Navbar  :menuOptions="[...topMenuOptions, ...bottomMenuOptions]" :on-menu-click="handleMenuClick"/>
        <div class="flex flex-grow overflow-hidden">
            <Sidebar :top-menu-options="topMenuOptions" :bottom-menu-options="bottomMenuOptions" :on-menu-select="handleMenuClick" />
            <main class="flex-grow h-screen overflow-y-auto px-4 sm:px-6 lg:px-8">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup>
    import Navbar from '@/components/common/Navbar.vue';
    import Sidebar from '@/components/common/Sidebar.vue';
    import  { DashboardFilled, BookFilled, PeopleAltFilled, HomeFilled, PersonFilled, LogOutFilled } from '@vicons/material';
    import { useRouter } from 'vue-router';
    import renderIcon from '@/utils/RenderIcon.js';

    const router = useRouter();

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