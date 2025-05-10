<template>
  <aside :class="['bg-[#0D5A79] sticky top-0 flex flex-col transition-all duration-300 ease-in-out overscroll-none',isCollapsed ? 'w-16' : 'w-60']" style="height: 100dvh;">
    <div class="p-4">
      <img :src="logo" alt="Logo" class="w-2/4" v-if="!isCollapsed" />
      <img :src="logo" alt="Logo" class="w-8 mx-auto" v-else />
    </div>

    <div class="flex flex-col flex-grow">
      <SidebarMenu
        :options="topMenuOptions"
        :active-key="activeKey"
        :collapsed="isCollapsed"
        @select="onMenuSelect"
      />
      <div class="flex-grow" />
      <SidebarMenu
        :options="bottomMenuOptions"
        :active-key="activeKey"
        :collapsed="isCollapsed"
        @select="onMenuSelect"
      />
    </div>

    <button
      @click="isCollapsed = !isCollapsed"
      class="absolute top-1/2 -right-5 transform -translate-y-1/2 z-50 cursor-pointer size-10 flex items-center justify-center bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 transition"
    >
      <ArrowCircleRightFilled :class="isCollapsed ? 'rotate-180' : ''" class="transition-transform text-[#0D5A79] size-10" />
    </button>
  </aside>
</template>

<script setup>
import SidebarMenu from '@/components/common/SidebarMenu.vue';
import logo from '@/assets/svg/logoDarkmode.svg';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowCircleRightFilled } from '@vicons/material';

defineProps({
  topMenuOptions: Array,
  bottomMenuOptions: Array,
  onMenuSelect: Function
});

const route = useRoute();
const isCollapsed = ref(false);
const activeKey = ref('');

watch(() => route.path, (newPath) => {
  activeKey.value = getActiveKeyFromPath(newPath);
}, { immediate: true });

function getActiveKeyFromPath(path) {
  const parts = path.split('/').filter(p => p);
  const base = parts[1] || 'dashboard';
  return base;
}
</script>
