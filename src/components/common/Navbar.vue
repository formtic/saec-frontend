<template>
    <nav class="md:hidden sticky top-0 z-50 bg-[#0D5A79] text-white flex items-center justify-between px-4 py-3 shadow-md">
        <img :src="logo" alt="logo" class="h-8" />
        <button @click="toggleMenu" class="text-white focus:outline-none cursor-pointer">
            <MenuRound class="size-6" />
        </button>
        <NavbarMenu v-if="showMenu" :options="menuOptions" @select="onMenuClick" />
    </nav>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import NavbarMenu from "@/components/common/NavbarMenu.vue";
import logo from '@/assets/svg/logoDarkmode.svg';
import { MenuRound } from '@vicons/material';

defineProps({
    menuOptions: Array,
    onMenuClick: Function
});

const showMenu = ref(false);

function toggleMenu() {
    showMenu.value = !showMenu.value;
}
</script>