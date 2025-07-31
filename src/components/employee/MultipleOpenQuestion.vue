<template>
  <div class="time-matching">
    <n-text tag="p" strong class="question-text">
      {{ question.title }}
    </n-text>

    <div class="items-container">
      <div
        v-for="(item, index) in question.subquestions"
        :key="index"
        class="item-row"
      >
        <n-text class="time-display">
          {{ item.subquestion }}
        </n-text>
        <n-input
          v-model:value="userAnswers[index]"
          type="text"
          placeholder="Escribe la respuesta..."
          clearable
          class="full-width-input"
          @update:value="handleInputChange"
        />
      </div>
    </div>

    <n-alert v-if="showIncompleteWarning && parentHasAttemptedSubmission" type="warning" :bordered="false"
      style="margin-top: 16px; background-color: #fff8e6">
      <div style="display: flex; align-items: center; gap: 8px">
        <span>Debes completar todas las respuestas para enviar el examen.</span>
      </div>
    </n-alert>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { NInput, NText, NAlert } from "naive-ui"; 
const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  hasAttemptedSubmission: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:answer']);

const userAnswers = ref([]);
const parentHasAttemptedSubmission = ref(props.hasAttemptedSubmission); 
const initializeAnswers = () => {
  
  const initialLength = props.question.subquestions ? props.question.subquestions.length : 0;
  const newAnswers = Array(initialLength).fill('');
  userAnswers.value = newAnswers;

  emitCurrentAnswerState();
};

// Validación: verificar si todos los campos están llenos
const isValid = computed(() =>
  userAnswers.value.every((answer) => answer.trim() !== "")
);

const emitCurrentAnswerState = () => {
  if (isValid.value) { // <--- Solo emite si todos los campos están completos
    const response = {
      questionId: props.question.id || props.question._id,
      questionType: props.question.questionType,
      userAnswers: [...userAnswers.value],
      isComplete: true, 
      isValid: true     
    };
    emit('update:answer', response);
  }
  // Si no es válido, no se emite nada.
};

const handleInputChange = () => {
  emitCurrentAnswerState(); 
};

// Watchers
watch(() => props.question.subquestions, initializeAnswers, { deep: true, immediate: true });

watch(() => props.hasAttemptedSubmission, (newVal) => {
  parentHasAttemptedSubmission.value = newVal;
  // Cuando el padre intenta la sumisión, este componente verifica si es válido.
  // Si es válido, emite. Si no, no emite nada, pero la alerta se muestra.
  emitCurrentAnswerState();
});

onMounted(initializeAnswers); 


const showIncompleteWarning = computed(() => {
  return !isValid.value && parentHasAttemptedSubmission.value;
});
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
