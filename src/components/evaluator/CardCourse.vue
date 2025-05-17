<template>
  <div @click="goToCourse" class="cursor-pointer flex border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <div class="w-2 bg-sky-700"></div>
    <div class="flex-1 flex justify-center items-center text-center h-24 px-4">
      <p>{{ name }}</p>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';

const props = defineProps({
  id:{
    type: Number,
    required: true
  },
  name:{
    type: String,
    required: true
  }
});

const router = useRouter();
function goToCourse(){
  router.push({name:'course-exams'});
}
</script>