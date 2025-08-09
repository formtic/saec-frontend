<template>
  <div>
    <h3 style="text-align: center; width: 100%; font-weight: 400">
      The user will see the answers randomly in two columns that can be sorted.
    </h3>

    <div class="rows-container">
      <div v-for="element in items" :key="element.id" class="question-row">
        <n-input v-model:value="element.concept" placeholder="Concept" class="input"
          :status="isValid(element.concept) ? 'success' : 'error'"
          @input="(val) => onInput(val, element.id, 'concept')" />
        <n-input v-model:value="element.definition" placeholder="Definition" class="input"
          :status="isValid(element.definition) ? 'success' : 'error'"
          @input="(val) => onInput(val, element.id, 'definition')" />
        <n-button color="red" @click="removeItem(element.id)">
          <template #icon>
            <n-icon :component="DeleteFilled" />
          </template>
        </n-button>
      </div>
    </div>

    <div class="add-button-container">
      <n-button color="#0D5A79" @click="addRow">Add Match</n-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NIcon, NInput, NButton } from "naive-ui";
import { DeleteFilled } from "@vicons/material";

export default defineComponent({
  name: "SimpleMatchQuestion",
  components: {
    NInput,
    NButton,
    NIcon,
    DeleteFilled
  },
  setup(_, { expose }) {  // <--- Aquí usamos expose en setup
    const items = ref([
      { id: 1, concept: "", definition: "" },
      { id: 2, concept: "", definition: "" },
    ]);

    const nextId = ref(3);

    const allowedRegex = /^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ.,()¿?¡!\s]*$/;

    const onInput = (val, id, field) => {
      const filtered = val.replace(/[^a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ.,()¿?¡!\s]/g, '');
      const index = items.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        items.value[index][field] = filtered;
      }
    };

    const isValid = (text) => {
      return text.trim() !== "" && allowedRegex.test(text);
    };

    const addRow = () => {
      items.value.push({
        id: nextId.value++,
        concept: "",
        definition: "",
      });
    };

    const removeItem = (id) => {
      if (items.value.length > 2) {
        const index = items.value.findIndex((item) => item.id === id);
        if (index !== -1) {
          items.value.splice(index, 1);
        }
      }
    };

    expose({
      getData: () => {
        return {
          concepts: items.value.map((item, index) => ({
            correctOrder: index,
            concept: item.concept
          })),
          definitions: items.value.map((item, index) => ({
            correctOrder: index,
            definition: item.definition
          }))
        };
      }
    });

    return {
      items,
      addRow,
      removeItem,
      onInput,
      isValid,
      DeleteFilled
    };
  },
});
</script>

<style scoped>
.rows-container {
  margin-top: 20px;
}

.question-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  flex-wrap: wrap;
}

.input {
  flex: 1;
  min-width: 150px;
}

.handle {
  cursor: default;
}

.add-button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
