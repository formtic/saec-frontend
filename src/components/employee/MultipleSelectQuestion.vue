<template>
  <div class="clean-room-options">
    <p class="question-text">3.- Selecciona cuales de los siguientes puntos los puedes relacionar con un cuarto limpio.</p>
    <div class="options-container">
      <n-checkbox-group v-model:value="selectedOptions" :max="3">
        <div class="checkbox-option" v-for="option in options" :key="option.value">
          <n-checkbox :value="option.value" />
          <div class="answer-box">{{ option.label }}</div>
        </div>
      </n-checkbox-group>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NCheckbox, NCheckboxGroup } from "naive-ui";

export default defineComponent({
  components: {
    NCheckbox,
    NCheckboxGroup
  },
  setup() {
    const selectedOptions = ref([]);
    const options = [
      { value: "option1", label: "Acabado Sanitario" },
      { value: "option2", label: "Filtros Hepa" },
      { value: "option3", label: "Esterilización" },
      { value: "option4", label: "Vestimenta" },
      { value: "option5", label: "Instrucciones de Acceso" }
    ];
    
    return {
      selectedOptions,
      options
    };
  }
});
</script>

<style scoped>
.clean-room-options {
  font-family: Arial, sans-serif;
  padding: 16px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.question-text {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 16px;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.answer-box {
  flex: 1;
  padding: 4px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
  margin: 4px;
}

.n-checkbox-group:focus-within .n-checkbox:checked + .answer-box,
.checkbox-option:hover .answer-box {
  border-color: #2d8cf0;
  background-color: #f0f7ff;
}
</style>