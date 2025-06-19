<template>
  <div>
    <h3 class="text-center w-full font-normal n-mb-6 " style="color: #778C96;">
      La respuesta correcta es solamente una propuesta, la respuesta debera ser revisada manualmente.
    </h3>
    <div class="rows-container">
      <div v-for="element in items" :key="element.id" class="question-row">
        <n-input v-model:value="element.textA" placeholder="Sub-pregunta" class="input" />
        <n-input v-model:value="element.textB" placeholder="Respuesta" class="input" />
        <n-button color="red" @click="removeItem(element.id)" :disabled="items.length <= 2">
          <template #icon>
            <n-icon :component="DeleteFilled" />
          </template>
        </n-button>
      </div>
    </div>
    
    <div class="add-button-container">
      <n-button color="#0D5A79" @click="addRow">Agregar sub-pregunta</n-button>
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