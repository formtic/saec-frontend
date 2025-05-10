<template>
    <div 
      @click="goToCourse"
      class="cursor-pointer flex border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <!-- Línea izquierda -->
      <div class="w-2 bg-sky-700"></div>
  
      <!-- Contenido de la tarjeta -->
      <div class="flex-1 flex justify-center items-center h-24 px-4">
        <p class="text-center text-lg font-semibold text-gray-800">{{ name }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { defineProps } from 'vue'
  
  const props = defineProps({
    id: {
      type: [String, Number],
      required: true
    },
    name: {
      type: String,
      required: true
    }
  })
  
  const router = useRouter()
  
  function goToCourse() {
    router.push({ name: 'DetalleCurso', params: { id: props.id } })
  }
  </script>
  