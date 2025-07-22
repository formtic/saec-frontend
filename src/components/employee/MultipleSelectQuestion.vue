<template>
  <div class="clean-room-options">
    <p class="question-text">{{ question.title }}</p>
    <div class="options-container">
      <n-checkbox-group v-model:value="selectedOptions">
        <div
          class="checkbox-option"
          v-for="(answer, index) in question.answers"
          :key="index"
        >
          <n-checkbox
            :value="index"
            :disabled="isDisabled(index)"
          />
          <div class="answer-box">{{ answer }}</div>
        </div>
      </n-checkbox-group>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NCheckbox, NCheckboxGroup } from "naive-ui";

export default defineComponent({
  name: "MultipleSelectQuestion",
  components: {
    NCheckbox,
    NCheckboxGroup
  },
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const selectedOptions = ref([]);

    const isDisabled = (index) => {
      return (
        selectedOptions.value.length >= props.question.numberOfChoices &&
        !selectedOptions.value.includes(index)
      );
    };

    return {
      selectedOptions,
      isDisabled
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
