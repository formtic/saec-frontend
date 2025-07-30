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

              <td
                v-for="(group, groupIndex) in groups"
                :key="'group-' + itemIndex + '-' + groupIndex"
              >
                <n-radio
                  :checked="selectedOptions[itemIndex] === groupIndex"
                  @click="toggleSelection(itemIndex, groupIndex)"
                />
              </td>

              <td>
                <n-radio
                  :checked="selectedOptions[itemIndex] === -1"
                  @click="toggleSelection(itemIndex, -1)"
                />
              </td>
            </tr>
          </tbody>
        </n-table>
      </div>
    </n-space>
  </n-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { NText, NCard, NSpace, NTable, NRadio } from "naive-ui";

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
});

// Los grupos vienen de question.groups
const groups = ref(props.question.groups || []);

// Los items son la unión de todos los items dentro de cada grupo correctAnswer
const items = ref(
  (props.question.correctAnswer || []).flatMap((g) => g.items || [])
);


const selectedOptions = ref(Array(items.value.length).fill(null));

function toggleSelection(itemIndex, value) {
  if (selectedOptions.value[itemIndex] === value) {
    selectedOptions.value[itemIndex] = null;//quitar seleccion
  } else {
    selectedOptions.value[itemIndex] = value;
  }
}


watch(
  () => props.question,
  (newQuestion) => {
    groups.value = newQuestion.groups || [];
    items.value = (newQuestion.correctAnswer || []).flatMap((g) => g.items || []);
    selectedOptions.value = Array(items.value.length).fill(null);
  },
  { immediate: true }
);
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
