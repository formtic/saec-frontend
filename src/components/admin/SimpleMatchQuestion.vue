<template>
  <div>
    <h3 style="text-align: center; width: 100%; font-weight: 400">
      El empleado verá la lista de respuestas aleatoriamente y divididas en dos columnas las cuales se podrán ordenar.
    </h3>

    <div class="rows-container">
      <div v-for="element in items" :key="element.id" class="question-row">
        <n-input
          v-model:value="element.textA"
          placeholder="Elemento A"
          class="input"
          :status="isValid(element.textA) ? 'success' : 'error'"
          @input="(val) => onInput(val, element.id, 'textA')"
        />
        <n-input
          v-model:value="element.textB"
          placeholder="Elemento B"
          class="input"
          :status="isValid(element.textB) ? 'success' : 'error'"
          @input="(val) => onInput(val, element.id, 'textB')"
        />
        <n-button color="red" @click="removeItem(element.id)">
          <template #icon>
            <n-icon :component="DeleteFilled" />
          </template>
        </n-button>
      </div>
    </div>

    <div class="add-button-container">
      <n-button color="#0D5A79" @click="addRow">Agregar Elemento</n-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NIcon, NInput, NButton } from "naive-ui";
import { DeleteFilled, MenuFilled } from "@vicons/material";

export default defineComponent({
  name: "OrderQuestionSingleRow",
  components: {
    NInput,
    NButton,
    NIcon,
    DeleteFilled,
    MenuFilled,
  },
  setup() {
    const items = ref([
      { id: 1, textA: "", textB: "", order: 1 },
      { id: 2, textA: "", textB: "", order: 2 },
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
        textA: "",
        textB: "",
        order: items.value.length + 1,
      });
    };

    const removeItem = (id) => {
      if (items.value.length > 2) {
        const index = items.value.findIndex((item) => item.id === id);
        if (index !== -1) {
          items.value.splice(index, 1);
          updateOrderNumbers();
        }
      }
    };

    const updateOrderNumbers = () => {
      items.value.forEach((item, index) => {
        item.order = index + 1;
      });
    };

    return {
      items,
      addRow,
      removeItem,
      onInput,
      isValid,
      DeleteFilled,
      MenuFilled,
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
