<template>
  <div class="parallel-dnd-container">
    <h3 class="question-text">
      5.- Relaciona los conceptos con sus definiciones reordenando ambas listas de forma independiente.
    </h3>

    <div class="columns-wrapper">
      <draggable
        v-model="leftConcepts"
        :item-key="(item) => item.id"
        handle=".handle"
        class="column"
        @end="updateNumberOrder"
      >
        <template #item="{ element, index }">
          <div class="concept-box with-index">
            <n-icon class="handle" size="20"><MenuFilled /></n-icon>
            <span class="index-box outside">{{ index + 1 }}</span>
            <span class="concept-text">{{ element.text }}</span>
          </div>
        </template>
      </draggable>

      <draggable
        v-model="rightConcepts"
        :item-key="(item) => item.id"
        handle=".handle"
        class="column"
        @end="updateConceptLetters"
      >
        <template #item="{ element, index }">
          <div class="concept-box with-index">
            <n-icon class="handle" size="20"><MenuFilled /></n-icon>
            <span class="index-box outside">{{ getLetter(index) }}</span>
            <span class="concept-text">{{ element.text }}</span>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NIcon } from "naive-ui";
import { MenuFilled } from "@vicons/material";
import draggable from "vuedraggable";

export default defineComponent({
  name: "ParallelDnD",
  components: {
    draggable,
    NIcon,
    MenuFilled,
  },
  setup() {
    const leftConcepts = ref([
      { id: 1, text: "Hardware" },
      { id: 2, text: "Software" },
      { id: 3, text: "CPU" },
      { id: 4, text: "Sistema Operativo" },
    ]);

    const rightConcepts = ref([
      {
        id: 5,
        text: "Parte física de un sistema informático, como el teclado, monitor o disco duro.",
      },
      {
        id: 6,
        text: "Conjunto de programas que permiten a una computadora realizar tareas específicas.",
      },
      {
        id: 7,
        text: "Unidad central de procesamiento que ejecuta instrucciones del software.",
      },
      {
        id: 8,
        text: "Software principal que gestiona el hardware y permite la interacción con el usuario.",
      },
    ]);

    const getLetter = (index) => String.fromCharCode(65 + index); // A, B, C...

    const updateNumberOrder = () => {
      //orden izquiero
    };

    const updateConceptLetters = () => {
      // orden derecho
    };

    return {
      leftConcepts,
      rightConcepts,
      MenuFilled,
      getLetter,
      updateNumberOrder,
      updateConceptLetters,
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
