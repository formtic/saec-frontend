<template>
  <div>
    <h3 class="text-center w-full font-normal n-mb-6" style="color: #778C96;">
      La respuesta correcta es solamente una propuesta, la respuesta deberá ser revisada manualmente.
    </h3>

    <div class="rows-container">
      <div v-for="element in items" :key="element.id" class="question-row">
        <div class="input-group">
          <n-input v-model:value="element.textA" placeholder="Sub-pregunta" class="input"
            :status="getStatus(element.textA)" @input="(value) => onInput(value, element, 'textA')" />
          <p v-if="!isValidText(element.textA)" class="error-message">
            El texto no debe estar vacío y solo debe contener letras, números y signos permitidos.
          </p>
        </div>

        <div class="input-group">
          <n-input v-model:value="element.textB" placeholder="Respuesta" class="input"
            :status="getStatus(element.textB)" @input="(value) => onInput(value, element, 'textB')" />
          <p v-if="!isValidText(element.textB)" class="error-message">
            El texto no debe estar vacío y solo debe contener letras, números y signos permitidos.
          </p>
        </div>

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
import { defineComponent, ref } from 'vue';
import { NInput, NButton, NIcon } from 'naive-ui';
import { DeleteFilled } from '@vicons/material';

export default defineComponent({
  name: 'MultipleOpenQuestion',
  components: {
    NInput,
    NButton,
    NIcon,
    DeleteFilled,
  },
  setup(_, { expose }) {
    const allowedRegex = /^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ.,()¿?¡!\s]*$/;

    const items = ref([
      { id: 1, textA: '', textB: '', order: 1 },
      { id: 2, textA: '', textB: '', order: 2 },
    ]);

    const nextId = ref(3);

    const addRow = () => {
      items.value.push({
        id: nextId.value++,
        textA: '',
        textB: '',
        order: items.value.length + 1,
      });
    };

    const removeItem = (id) => {
      const index = items.value.findIndex((item) => item.id === id);
      if (index !== -1 && items.value.length > 2) {
        items.value.splice(index, 1);
        updateOrderNumbers();
      }
    };

    const updateOrderNumbers = () => {
      items.value.forEach((item, index) => {
        item.order = index + 1;
      });
    };

    const onInput = (value, obj, key) => {
      const filtered = value.replace(/[^a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ.,()¿?¡!\s]/g, '');
      obj[key] = filtered;
    };

    const isValidText = (text) => {
      return text.trim() !== '' && allowedRegex.test(text);
    };

    const getStatus = (text) => {
      return isValidText(text) ? 'success' : 'error';
    };

    expose({
      getData: () => ({
        subquestions: items.value.map(({ textA, textB }) => ({
          subquestion: textA,
          correctAnswer: textB,
        }))
      })
    });

    return {
      items,
      addRow,
      removeItem,
      onInput,
      isValidText,
      getStatus,
      DeleteFilled,
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
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  flex-wrap: wrap;
}

.input {
  flex: 1;
  min-width: 150px;
}

.input-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 4px;
}

.add-button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
