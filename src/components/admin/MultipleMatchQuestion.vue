<template>
  <div>
    <h3 class="text-center w-full font-normal n-mb-6">
      Arrastra cada elemento a la columna correspondiente.
    </h3>

    <div class="n-card n-card--bordered n-mt-6 n-p-4">
      <n-space justify="space-between" align="center" class="n-mb-6 marginClass">
        <h3 class="n-title n-title--medium">Opciones</h3>
        <n-button @click="addOption" color="#0D5A79" class="min-w-36">
          Agregar Opción
        </n-button>
      </n-space>

      <div class="n-card n-card--content-padding n-mb-4">
        <draggable v-model="options" group="items" :item-key="itemKey" handle=".handle" :animation="150" :class="[
          'options-grid',
          options.length === 1 && 'single-item',
          options.length === 2 && 'two-items',
        ]">
          <template #item="{ element }">
            <n-card embedded class="option-card sm">
              <div class="flex items-center gap-2 w-full">
                <n-icon class="handle cursor-move flex-shrink-0" size="20">
                  <MenuFilled />
                </n-icon>
                <n-input v-model:value="element.text" placeholder="Escribe una opción" class="flex-grow min-w-0" />
                <n-button color="red" @click="removeOption(element.id)" class="flex-shrink-0">
                  <template #icon>
                    <n-icon :component="DeleteFilled" />
                  </template>
                </n-button>
              </div>
            </n-card>
          </template>
        </draggable>
      </div>

      <n-space justify="space-between" align="center" class="n-mb-6 marginClass">
        <h3 class="n-title n-title--medium">Columnas</h3>
        <n-button @click="addColumn" color="#0D5A79" class="min-w-36">
          Agregar Columna
        </n-button>
      </n-space>

      <div class="n-card n-card n-mb-4">
        <draggable v-model="columns" group="columns" item-key="id" handle=".column-handle" :animation="150" :class="[
          'columns-grid',
          columns.length === 1 && 'single-item',
          columns.length === 2 && 'two-items',
        ]">
          <template #item="{ element }">
            <n-card embedded class="column bg-white">
              <div class="flex flex-col gap-3 w-full">
                <div class="flex items-center gap-2 w-full">
                  <n-icon class="column-handle cursor-move flex-shrink-0" size="20">
                    <MenuFilled />
                  </n-icon>
                  <n-input v-model:value="element.title" placeholder="Título de columna" class="flex-grow min-w-0" />
                  <n-button color="red" @click="removeColumn(element.id)" :disabled="columns.length <= 1"
                    class="flex-shrink-0">
                    <template #icon>
                      <n-icon :component="DeleteFilled" />
                    </template>
                  </n-button>
                </div>

                <draggable v-model="element.items" group="items" :item-key="itemKey" handle=".handle" :animation="150"
                  class="n-card n-card--content-padding column-items bg-white" @add="onItemAdd(element)">
                  <template #item="{ element: item }">
                    <n-card embedded class="option-card in-column">
                      <div class="flex items-center gap-2 w-full">
                        <n-icon class="handle cursor-move flex-shrink-0" size="20">
                          <MenuFilled />
                        </n-icon>
                        <div class="option-text flex-grow min-w-0">
                          {{ item.text }}
                        </div>
                      </div>
                    </n-card>
                  </template>
                </draggable>
              </div>
            </n-card>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<style scoped>
.options-grid,
.columns-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
}

.options-grid .option-card.sm :deep(.n-card__content),
.column .option-card.in-column :deep(.n-card__content) {
  padding: 8px !important;
}

.column :deep(.n-card__content) {
  padding: 12px !important;
}

.options-grid.single-item,
.columns-grid.single-item {
  grid-template-columns: 1fr;
  max-width: calc(33.33% - 10px);
}

.options-grid.two-items,
.columns-grid.two-items {
  grid-template-columns: 1fr 1fr;
  max-width: calc(66.66% - 10px);
}

.marginClass {
  margin-top: 15px;
  margin-bottom: 15px;
}

.column-items {
  min-height: 120px;
  display: grid;
  gap: 8px;
  background-color: white;
}

.option-card {
  border: 1px solid #e0e3e7;
  background-color: white;
}

.option-card.in-column {
  background-color: #e6f7ff;
  border-color: #91d5ff;
}

.option-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1075px) {

  .options-grid,
  .columns-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1075px) {

  .options-grid,
  .columns-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .options-grid.single-item,
  .options-grid.two-items,
  .columns-grid.single-item,
  .columns-grid.two-items {
    max-width: 100%;
  }
}

@media (max-width: 639px) {

  .options-grid,
  .options-grid.single-item,
  .options-grid.two-items,
  .columns-grid,
  .columns-grid.single-item,
  .columns-grid.two-items {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
}
</style>


<script>
import { defineComponent, ref } from "vue";
import { NIcon, NInput, NButton } from "naive-ui";
import { DeleteFilled, MenuFilled } from "@vicons/material";
import draggable from "vuedraggable";

export default defineComponent({
  name: "GroupingQuestion",
  components: {
    draggable,
    NInput,
    NButton,
    NIcon,
    DeleteFilled,
    MenuFilled,
  },
  setup() {
    // Opciones arrastrables
    const options = ref([
      { id: 1, text: "Manzana" },
      { id: 2, text: "Zanahoria" },
      { id: 3, text: "Plátano" },
      { id: 4, text: "Lechuga" },
      { id: 5, text: "Sandía" },
      { id: 6, text: "Brócoli" },
      { id: 7, text: "Uva" },
      { id: 8, text: "Espinaca" },
    ]);

    // Columnas con sus items
    const columns = ref([
      {
        id: 1,
        title: "Frutas",
        items: [],
      },
      {
        id: 2,
        title: "Verduras",
        items: [],
      },
    ]);

    const nextOptionId = ref(9);
    const nextColumnId = ref(3);

    const itemKey = (item) => item.id;

    const addOption = () => {
      options.value.push({
        id: nextOptionId.value++,
        text: "",
      });
    };

    const removeOption = (id) => {
      const index = options.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        options.value.splice(index, 1);
      }
    };

    const addColumn = () => {
      columns.value.push({
        id: nextColumnId.value++,
        title: "",
        items: [],
      });
    };

    const removeColumn = (id) => {
      if (columns.value.length > 1) {
        const column = columns.value.find((c) => c.id === id);
        if (column) {
          // Devolver items a las opciones
          options.value.push(...column.items);
          const index = columns.value.findIndex((col) => col.id === id);
          if (index !== -1) {
            columns.value.splice(index, 1);
          }
        }
      }
    };

    const onItemAdd = (column) => {
      // (manejado automáticamente por vuedraggable)
    };

    return {
      options,
      columns,
      itemKey,
      addOption,
      removeOption,
      addColumn,
      removeColumn,
      onItemAdd,
      DeleteFilled,
      MenuFilled,
    };
  },
});
</script>
