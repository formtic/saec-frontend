<template>
  <div class="parallel-dnd-container">
    <h3 class="question-text">
      {{ question.title }}
    </h3>

    <div class="columns-wrapper">
      <draggable v-model="elementsList" :item-key="(item) => item.element" handle=".handle" class="column"
        @end="updateElementsOrder">
        <template #item="{ element, index }">
          <div class="concept-box with-index">
            <n-icon class="handle" size="20">
              <MenuFilled />
            </n-icon>
            <span class="index-box outside">{{ index + 1 }}</span>
            <span class="concept-text">{{ element.element }}</span>
          </div>
        </template>
      </draggable>

      <draggable v-model="valuesList" :item-key="(item) => item.value" handle=".handle" class="column"
        @end="updateValuesOrder">
        <template #item="{ element, index }">
          <div class="concept-box with-index">
            <n-icon class="handle" size="20">
              <MenuFilled />
            </n-icon>
            <span class="index-box outside">{{ getLetter(index) }}</span>
            <span class="concept-text">{{ element.value }}</span>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import { NIcon } from "naive-ui";
import { MenuFilled } from "@vicons/material";
import draggable from "vuedraggable";

export default defineComponent({
  name: "MultipleOrderQuestion",
  components: {
    draggable,
    NIcon,
    MenuFilled,
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
    const elementsList = ref([]);
    const valuesList = ref([]);
    const originalElements = ref([]);

    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    const initializeLists = () => {
      originalElements.value = [...props.question.elements];
      elementsList.value = shuffleArray([...props.question.elements]);
      valuesList.value = shuffleArray(
        props.question.elements.map(el => ({ value: el.value }))
      );
      emitAnswer();
    };

    const getLetter = (index) => String.fromCharCode(65 + index);

    const updateElementsOrder = () => {
      emitAnswer();
    };

    const updateValuesOrder = () => {
      emitAnswer();
    };

    const emitAnswer = () => {
      const answer = {
        questionIndex:  props.questionIndex,
        questionType: props.question.questionType,
        correctAnswers: originalElements.value,
        userAnswers: elementsList.value.map((element, index) => ({
          element: element.element,
          value: valuesList.value[index]?.value || ''
        })),
        isComplete: true
      };

      emit("update:answer", answer);
    };

    onMounted(() => {
      initializeLists();
    });

    watch(() => props.question, () => {
      initializeLists();
    }, { deep: true });

    return {
      elementsList,
      valuesList,
      MenuFilled,
      getLetter,
      updateElementsOrder,
      updateValuesOrder,
    };
  },
});
</script>


<style scoped>
.parallel-dnd-container {
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.question-text {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 16px;
}

.columns-wrapper {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1 1 50%;
  position: relative;
}

.concept-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: white;
  position: relative;
  margin-left: 36px;
}

.index-box {
  color: #59b6e4;
  border: 1px solid #59b6e4;
  width: 24px;
  height: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 0.9rem;
}

.index-box.outside {
  position: absolute;
  left: -36px;
  top: 50%;
  transform: translateY(-50%);
}

.handle {
  cursor: grab;
  color: #666;
}

.handle:active {
  cursor: grabbing;
}

.concept-text {
  flex-grow: 1;
}
</style>