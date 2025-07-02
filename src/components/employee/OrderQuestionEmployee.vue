<template>
  <div class="order-question-container">
    <h3 class="question-text">
      4.- ¿Qué operaciones debes realizar para el armado del adaptador con guarda? Acomoda la secuencia.
    </h3>
    <draggable v-model="items" :item-key="itemKey" handle=".handle" :animation="150" @end="onDragEnd">
      <template #item="{ element, index }">
        <div class="item-container">
          <div class="index-box">{{ index + 1 }}</div>
          <div class="draggable-item">
            <n-icon class="handle" size="20">
              <MenuFilled />
            </n-icon>
            <span class="option-text">{{ element.text }}</span>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NIcon } from "naive-ui";
import { MenuFilled } from "@vicons/material";
import draggable from "vuedraggable";

export default defineComponent({
  name: "OrderQuestion",
  components: {
    draggable,
    NIcon,
    MenuFilled,
  },
  setup() {
    const items = ref([
      {
        id: 1,
        text: "Surtir las gavetas del proceso de ensamble cuando se tenga una cantidad suficiente acumulada en la gabeta contenedora",
        order: 1,
      },
      {
        id: 2,
        text: "Introducir la guarda en el adaptador luer lock dar un leve giro para asegurar el ensamble",
        order: 2,
      },
      {
        id: 3,
        text: "Tomar simultáneamente el adaptador luer lock y la guarda adaptador",
        order: 3,
      },
      {
        id: 4,
        text: "Colocar el adaptador luer lock con guarda en la gaveta contenedora",
        order: 4,
      },
    ]);

    

    // Mezclar los items para que aparezcan en orden aleatorio inicialmente
    items.value = items.value.sort(() => Math.random() - 0.5);

    const itemKey = (item) => item.id;

    const onDragEnd = () => {
      updateOrderNumbers();
    };

    const updateOrderNumbers = () => {
      items.value.forEach((item, index) => {
        item.order = index + 1;
      });
    };

    return {
      items,
      itemKey,
      onDragEnd,
      MenuFilled,
    };
  },
});
</script>

<style scoped>
.order-question-container {
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

.item-container {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  position: relative;
  margin-left: 30px;

}

.index-box {
  position: absolute;
  left: -32px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  color: #59b6e4;
  border: 1px solid #59b6e4;

  border-radius: 4px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.draggable-item {
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 12px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: white;
  transition: all 0.3s;
}

.draggable-item:hover {
  border-color: #2d8cf0;
  background-color: #f0f7ff;
}

.handle {
  cursor: grab;
  color: #666;
}

.handle:active {
  cursor: grabbing;
}

.option-text {
  flex-grow: 1;
}
</style>
