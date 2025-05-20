<template>
  <div
    @click="goToCourse"
    class="cursor-pointer flex border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
  >
    <div class="w-2 bg-sky-500"></div>
    <div class="flex-1 flex flex-col justify-center lg:py-10 md:py-8 py-6 px-4 text-center overflow-hidden">
      <p class="truncate text-ellipsis overflow-hidden whitespace-nowrap w-full">
        {{ name }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const router = useRouter();
function goToCourse() {
  // router.push({ name: 'course-exams' });
  router.push({name: 'course-exams', params: {id: props.id, title:props.name}})
}
</script>