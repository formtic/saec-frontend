<template>
  <div class="simple-select-question">
    <p class="question-text">{{ question.title }}</p>
    <div class="options-container">
      <n-radio-group v-model:value="selectedOption" @update:value="emitAnswer">
        <div v-for="(answer, index) in question.answers" :key="index" class="radio-option">
          <n-radio :value="index.toString()" />
          <div class="answer-box">{{ answer }}</div>
        </div>
      </n-radio-group>
    </div>

    <n-alert v-if="showIncompleteWarning && parentHasAttemptedSubmission" type="warning" :bordered="false"
      style="margin-top: 16px; background-color: #fff8e6">
      <div style="display: flex; align-items: center; gap: 8px">
        <span>Selecciona una opción.</span>
      </div>
    </n-alert>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from "vue";
import { NRadio, NRadioGroup, NAlert } from "naive-ui";

export default defineComponent({
  name: "SimpleSelectQuestion",
  components: {
    NRadio,
    NRadioGroup,
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
    },
    questionIndex: {
      type: Number,
      required: true
    }
  },
  emits: ["update:answer"],
  setup(props, { emit }) {
    const selectedOption = ref(null);
    const parentHasAttemptedSubmission = ref(props.hasAttemptedSubmission);

    const showIncompleteWarning = computed(() => {
      return selectedOption.value === null;
    });

    const emitAnswer = () => {
      const answer = {
        questionIndex: props.questionIndex,
        questionType: props.question.questionType,
        correctAnswers: props.question.correctAnswer.answer,
        userAnswers: selectedOption.value !== null ? [selectedOption.value] : [],
        isComplete: !showIncompleteWarning.value
      };
      console.log("Emitting answer:", answer);

      emit("update:answer", answer);
    };

    watch(selectedOption, () => {
      emitAnswer();
    });

    watch(() => props.question, () => {
      selectedOption.value = null;
      emitAnswer();
    }, { deep: true });

    watch(() => props.hasAttemptedSubmission, (newVal) => {
      parentHasAttemptedSubmission.value = newVal;
    });

    return {
      selectedOption,
      showIncompleteWarning,
      parentHasAttemptedSubmission,
      emitAnswer
    };
  }
});
</script>

<style scoped>
.simple-select-question {
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

.radio-option {
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
  margin: 4px 0;
}

.n-radio-group:focus-within .n-radio:checked+.answer-box,
.radio-option:hover .answer-box {
  border-color: #2d8cf0;
  background-color: #f0f7ff;
}
</style>
