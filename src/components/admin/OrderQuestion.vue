<template>
  <div>
    <h3 style="text-align: center; width: 100%; font-weight: 400">
      Organiza las respuestas en el orden correcto, el empleado verá la lista de respuesta aleatoriamente
    </h3>

    <draggable v-model="items" :item-key="itemKey" handle=".handle" :animation="150" @end="onDragEnd">
      <template #item="{ element }">
        <div class="draggable-item">
          <n-icon class="handle" size="20">
            <MenuFilled />
          </n-icon>
          <n-input v-model:value="element.text" placeholder="Elemento a ordenar"
            :status="isValid(element.text) ? 'success' : 'error'" @input="(val) => onInput(val, element.id)"
            style="flex-grow: 1" />
          <n-button color="red" @click="removeItem(element.id)">
            <template #icon>
              <n-icon :component="DeleteFilled" />
            </template>
          </n-button>
        </div>
      </template>
    </draggable>

    <div class="add-button-container">
      <n-button color="#0D5A79" @click="addItem">Agregar Elemento</n-button>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { NIcon, NInput, NButton } from "naive-ui";
import { DeleteFilled, MenuFilled } from "@vicons/material";
import draggable from "vuedraggable";

export default defineComponent({
  name: "OrderQuestion",
  components: {
    draggable,
    NInput,
    NButton,
    NIcon,
    DeleteFilled,
    MenuFilled,
  },
  setup(_, { expose }) {
    const items = ref([
      { id: 1, text: "", order: 1 },
      { id: 2, text: "", order: 2 },
    ]);

    const allowedRegex = /^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ.,()¿?¡!\s]*$/;

    const itemKey = (item) => item.id;

    const onInput = (val, id) => {
      const filtered = val.replace(/[^a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ.,()¿?¡!\s]/g, '');
      const index = items.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        items.value[index].text = filtered;
      }
    };

    const isValid = (text) => {
      return text.trim() !== "" && allowedRegex.test(text);
    };

    const addItem = () => {
      const newId = items.value.length > 0 ? Math.max(...items.value.map((i) => i.id)) + 1 : 1;
      items.value.push({
        id: newId,
        text: "",
        order: newId,
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

    const onDragEnd = () => {
      updateOrderNumbers();
    };

    expose({
      getData: () => ({
        answers: items.value.map((item, index) => ({
          answerOrder: index,
          answer: item.text
        }))
      })
    });

    return {
      items,
      itemKey,
      addItem,
      removeItem,
      onDragEnd,
      onInput,
      isValid,
      DeleteFilled,
      MenuFilled,
    };
  },
});
</script>


<style scoped>
.draggable-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  padding: 10px;
  background: #f7f8fa;
  border-radius: 8px;
}

.handle {
  cursor: move;
  cursor: -webkit-grab;
  cursor: grab;
}

.handle:active {
  cursor: -webkit-grabbing;
  cursor: grabbing;
}

.add-button-container {
  width: calc(100% - 1rem);
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
