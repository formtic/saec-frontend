<template>
  <div class="simple-select-question">
    <p class="question-text">{{ question.title }}</p>
    <div class="options-container">
      <n-radio-group v-model:value="selectedOption">
        <div
          v-for="(answer, index) in question.answers"
          :key="index"
          class="radio-option"
        >
          <n-radio :value="index.toString()" />
          <div class="answer-box">{{ answer }}</div>
        </div>
      </n-radio-group>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NRadio, NRadioGroup } from "naive-ui";

export default defineComponent({
  name: "SimpleSelectQuestion",
  components: {
    NRadio,
    NRadioGroup
  },
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  setup() {
    const selectedOption = ref(null);
    return {
      selectedOption
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

.n-radio-group:focus-within .n-radio:checked + .answer-box,
.radio-option:hover .answer-box {
  border-color: #2d8cf0;
  background-color: #f0f7ff;
}
</style>
