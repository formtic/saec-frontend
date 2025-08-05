<template>
  <n-card :bordered="false">
    <n-space vertical :size="16" class="customContainer">
      <n-text tag="div" class="question-text">
        {{ question.title }}
      </n-text>

      <div class="table-container">
        <n-table :bordered="false" :single-line="false" size="small">
          <thead>
            <tr>
              <th>Ítem</th>
              <th v-for="(group, index) in groups" :key="'header-' + index">
                {{ group.groupName }}
              </th>
              <th>Ninguno</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, itemIndex) in items" :key="'item-' + itemIndex">
              <td>{{ item.text }}</td>

              <td v-for="(group, groupIndex) in groups" :key="'group-' + itemIndex + '-' + groupIndex">
                <n-radio :checked="selectedOptions[itemIndex] === groupIndex"
                  @click="toggleSelection(itemIndex, groupIndex)" />
              </td>

              <td>
                <n-radio :checked="selectedOptions[itemIndex] === -1" @click="toggleSelection(itemIndex, -1)" />
              </td>
            </tr>
          </tbody>
        </n-table>
      </div>
      <n-alert v-if="showIncompleteWarning && parentHasAttemptedSubmission" type="warning" :bordered="false"
        style="margin-top: -8px; margin-bottom: -8px; background-color: #fff8e6">
        <div style="display: flex; align-items: center; gap: 8px">
          <n-icon size="18" color="#ff9900"><information-circle-outline /></n-icon>
          <span>Por favor, elige una opción para cada elemento.</span>
        </div>
      </n-alert>


    </n-space>
  </n-card>
</template>

<script setup>
import { ref, watch, computed, defineProps, defineEmits } from "vue";
import { NText, NCard, NSpace, NTable, NRadio, NAlert } from "naive-ui";

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  hasAttemptedSubmission: {
    type: Boolean,
    default: false
  },
    questionIndex: {
      type: Number,
      required: true
    }
});

const emit = defineEmits(["update:answer"]);

const groups = ref(props.question.groups || []);
const items = ref(props.question.options || []);
const selectedOptions = ref(Array(items.value.length).fill(null));
const parentHasAttemptedSubmission = ref(props.hasAttemptedSubmission);

//verifica si hay opciones sin seleccionar
const showIncompleteWarning = computed(() => {
  return selectedOptions.value.some(option =>
    option === null || option === undefined
  );
});

function toggleSelection(itemIndex, value) {
  selectedOptions.value[itemIndex] =
    selectedOptions.value[itemIndex] === value ? null : value;
  emitAnswer();
}

function emitAnswer() {
  emit("update:answer", {
    questionIndex: props.questionIndex,
    questionType: props.question.questionType,
    answers: selectedOptions.value.map((groupIndex, i) => ({
      itemId: items.value[i].id,
      selectedGroup: groupIndex,
    })),
    isComplete: !showIncompleteWarning.value
  });
}

watch(
  () => props.question,
  (newQuestion) => {
    groups.value = newQuestion.groups || [];
    items.value = newQuestion.options || [];
    selectedOptions.value = Array(items.value.length).fill(null);
    emitAnswer();
  },
  { immediate: true }
);

watch(() => props.hasAttemptedSubmission, (newVal) => {
  parentHasAttemptedSubmission.value = newVal;
});
</script>



<style scoped>
.customContainer {
  margin: -20px;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

.question-text {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 16px;
}

.n-table {
  width: 100%;
  min-width: 800px;
}

.n-table th {
  white-space: nowrap;
  text-align: center;
  background-color: #f8f8f8;
  font-weight: bold;
}

.n-table td {
  text-align: center;
  vertical-align: middle;
}

.n-table td:first-child {
  min-width: 300px;
  text-align: left;
}

@media (max-width: 768px) {
  .table-container {
    border: 1px solid #eee;
    border-radius: 4px;
  }

  .n-table {
    min-width: unset;
  }

  .n-table td:first-child {
    min-width: 200px;
  }
}
</style>
