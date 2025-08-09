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
          placeholder="Escribe la correspondencia..."
          clearable
          class="full-width-input"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { NInput, NText } from "naive-ui";

// Recibe la pregunta completa como prop
const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
});

const userAnswers = ref([]);

userAnswers.value = props.question.subquestions
  ? props.question.subquestions.map(() => "")
  : [];

watch(
  () => props.question.subquestions,
  (newSubs) => {
    userAnswers.value = newSubs ? newSubs.map(() => "") : [];
  }
);
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
