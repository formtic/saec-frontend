<template>
  <div class="clean-room-options">
    <p class="question-text">{{ question.title }}</p>
    <div class="options-container">
      <n-checkbox-group v-model:value="selectedOptions">
        <div class="checkbox-option" v-for="(answer, index) in question.answers" :key="index">
          <n-checkbox :value="index" :disabled="isDisabled(index)" @click="emitAnswer" />
          <div class="answer-box">{{ answer }}</div>
        </div>
      </n-checkbox-group>
    </div>

    <n-alert v-if="showIncompleteWarning && parentHasAttemptedSubmission" type="warning" :bordered="false"
      style="margin-top: 16px; background-color: #fff8e6">
      <div style="display: flex; align-items: center; gap: 8px">
        <span>Selecciona almenos una opcion.</span>
      </div>
    </n-alert>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from "vue";
import { NCheckbox, NCheckboxGroup, NAlert, NIcon } from "naive-ui";
import { InformationCircleOutline } from "@vicons/ionicons5";

export default defineComponent({
  name: "MultipleSelectQuestion",
  components: {
    NCheckbox,
    NCheckboxGroup,
    NAlert,
    NIcon,
    InformationCircleOutline
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
    },
    questionIndex: {
      type: Number,
      required: true
    }
  },
  emits: ["update:answer"],
  setup(props, { emit }) {
    const selectedOptions = ref([]);
    const parentHasAttemptedSubmission = ref(props.hasAttemptedSubmission);

    const isDisabled = (index) => {
      return (
        selectedOptions.value.length >= props.question.numberOfChoices &&
        !selectedOptions.value.includes(index)
      );
    };

    const showIncompleteWarning = computed(() => {
      return selectedOptions.value.length === 0;
    });

    const emitAnswer = () => {
      const answer = {
        questionIndex:  props.questionIndex,
        questionType: props.question.questionType,
        correctAnswers: props.question.correctAnswers.answers,
        userAnswers: [...selectedOptions.value],
        isComplete: !showIncompleteWarning.value
      };
      console.log("Emitting answer:", answer);

      emit("update:answer", answer);
    };

    watch(selectedOptions, () => {
      emitAnswer();
    }, { deep: true });

    watch(() => props.question, () => {
      selectedOptions.value = [];
      emitAnswer();
    }, { deep: true });

    watch(() => props.hasAttemptedSubmission, (newVal) => {
      parentHasAttemptedSubmission.value = newVal;
    });

    return {
      selectedOptions,
      isDisabled,
      showIncompleteWarning,
      parentHasAttemptedSubmission
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

.n-checkbox-group:focus-within .n-checkbox:checked+.answer-box,
.checkbox-option:hover .answer-box {
  border-color: #2d8cf0;
  background-color: #f0f7ff;
}
</style>