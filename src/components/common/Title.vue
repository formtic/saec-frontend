<template>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex justify-center md:justify-between items-center flex-wrap gap-2">
        <nav
          class="hidden md:flex items-center space-x-2 text-gray-500 text-sm"
          v-if="breadcrumbs?.length"
        >
          <template v-for="(crumb, index) in breadcrumbs" :key="index">
            <div class="flex items-center gap-1">
              <component
                v-if="crumb.icon"
                :is="crumb.icon"
                class="size-6"
                :class="index === breadcrumbs.length - 1 ? 'text-[#0D5A79]' : ''"
              />
              <span
                :class="index === breadcrumbs.length - 1 ? 'text-[#0D5A79] font-semibold' : ''"
                class="text-xl"
              >
                {{ crumb.label }}
              </span>
            </div>
            <span v-if="index < breadcrumbs.length - 1">/</span>
          </template>
        </nav>
        <h1 class="text-5xl font-bold text-[#0D5A79]">
          {{ title }}
        </h1>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
  });
  </script>
  