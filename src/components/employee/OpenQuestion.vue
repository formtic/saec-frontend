<template>
  <div class="pvc-warnings">
    <p class="question-text">{{ question.title }}</p>
    <div class="textarea-container">
      <n-input
        v-model:value="answer"
        type="textarea"
        placeholder="Escribe tu respuesta aquí..."
        :autosize="{ minRows: 3, maxRows: 5 }"
      />
    </div>

    <n-alert 
      v-if="showIncompleteWarning && parentHasAttemptedSubmission" 
      type="warning" 
      :bordered="false"
      style="margin-top: 16px; background-color: #fff8e6"
    >
      <div style="display: flex; align-items: center; gap: 8px">
        <span>Por favor, escribe tu respuesta.</span>
      </div>
    </n-alert>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from "vue";
import { NInput, NAlert } from "naive-ui";

export default defineComponent({
  name: "OpenQuestion",
  components: {
    NInput,
    NAlert
  },
  props: {
    question: {
      type: Object,
      required: true
    },
    hasAttemptedSubmission: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:answer"],
  setup(props, { emit }) {
    const answer = ref("");
    const parentHasAttemptedSubmission = ref(props.hasAttemptedSubmission);

    const showIncompleteWarning = computed(() => {
      return answer.value.trim() === "";
    });

    const emitAnswer = () => {
      const response = {
        questionType: props.question.questionType,
        correctAnswers: props.question.correctAnswer.answer,
        userAnswers: answer.value,
        isComplete: !showIncompleteWarning.value
      };
      
      emit("update:answer", response);
    };

    watch(answer, () => {
      emitAnswer();
    });

    watch(() => props.question, () => {
      answer.value = "";
      emitAnswer();
    }, { deep: true });

    watch(() => props.hasAttemptedSubmission, (newVal) => {
      parentHasAttemptedSubmission.value = newVal;
    });

    return {
      answer,
      showIncompleteWarning,
      parentHasAttemptedSubmission
    };
  }
});
</script>
<style scoped>
.pvc-warnings {
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

.textarea-container {
  margin-top: 8px;
}

.n-input {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  transition: all 0.3s;
  padding: 8px;
}

.n-input:focus {
  border-color: #2d8cf0;
  box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
}
</style>
