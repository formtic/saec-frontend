<template>
  <div class="card-container border border-gray-300 rounded-md shadow-sm p-4">
    <n-text class="font-semibold text-base mb-1 text-gray-900">
      {{ title }}
    </n-text>
    <n-text class="text-sm text-gray-700 leading-snug line-clamp-2">
      {{ body }}
    </n-text>
    <div class="mt-3 flex justify-between text-xs text-gray-500">
      <span>Secciones: {{ sections }}</span>
      <span>Puntaje: {{ score }}/100.00</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SimpleItem',
  props: {
    title: String,
    body: String,
    sections: {
      type: Number,
      default: 0
    },
    score: {
      type: String,
      default: '--.--'
    }
  }
});
</script>

<style scoped>
.card-container {
  background-color: #f9f9f9;
  height: auto;
  width: 100%;
  max-width: 500px;
  transition: box-shadow 0.3s;
}
.card-container:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
