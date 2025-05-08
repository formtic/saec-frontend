<template>
  <div class="w-full min-h-screen pt-9">
    <Title title="Panel General" :breadcrumbs="breadcrumb" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-9">
      <div
        class="border border-gray-200 flex flex-col items-center justify-center w-full p-2 rounded-md"
      >
        <div class="flex gap-2">
          <ArrowRightFilled class="size-6 text-gray-600" />
          <p class="text-gray-600 text-xl">Departamentos</p>
        </div>
        <p class="text-[#0D5A79] text-2xl font-bold">10</p>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div class="w-full md:col-span-2 p-2 border-blue-800 rounded-md border-2" />
        <div class="w-full h-full p-2 bg-indigo-500">

        </div>
    </div>
  </div>
</template>

<script setup>
import Title from "@/components/common/Title.vue";
import { DashboardFilled, ArrowRightFilled } from "@vicons/material";
import renderIcon from "@/utils/RenderIcon.js";

const breadcrumb = [
  { label: "Panel General", icon: renderIcon(DashboardFilled) },
];
</script>
