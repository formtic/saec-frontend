<template>
  <div class="time-matching">
    <n-text tag="p" strong class="question-text">
      8.- Colores de almacenamiento de las sustancias. Relaciona según corresponda.
    </n-text>

    <div class="items-container">
      <div
        v-for="(item, index) in timeItems"
        :key="index"
        class="item-row"
      >
        <n-text class="time-display">
          {{ item.time }}
        </n-text>
        <n-input
          v-model:value="item.answer"
          type="text"
          placeholder="Escribe la correspondencia..."
          clearable
          class="full-width-input"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { NInput, NText } from "naive-ui"

const timeItems = ref([
  { time: "Son las 4 de la tarde con 45 minutos", answer: "" },
  { time: "Son las 8 de la mañana con 5 minutos", answer: "" },
  { time: "Son las 11 de la noche con 59 minutos", answer: "" }
])
</script>

<style scoped>
.time-matching {
  padding: 1rem;
}

.question-text {
  margin-bottom: 1rem;
  display: block;
    font-weight: bold;

}

.items-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.time-display {
  flex: 0 0 auto;
  min-width: 200px;
  max-width: 100%;
}

.full-width-input {
  flex: 1;
  min-width: 200px;
}

@media (max-width: 640px) {
  .item-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .time-display,
  .full-width-input {
    width: 100%;
    min-width: 100%;
  }
}
</style>