<template>
  <div>
    <n-grid :cols="2" v-for="(element, index) in elements" :key="index">
      <n-gi style="margin-right: 2.5px">
        <n-form-item label="Elemento" required :feedback="getFeedback(element.name)">
          <n-input
            v-model:value="element.name"
            placeholder="Elemento"
            :status="isValid(element.name) ? 'success' : 'error'"
            @input="(val) => onInput(val, index, 'name')"
          />
        </n-form-item>
      </n-gi>
      <n-gi style="margin-left: 2.5px; display: flex; gap: 5px; align-items: center;">
        <n-form-item label="Valor" required style="width: 100%" :feedback="getFeedback(element.value)">
          <n-input
            v-model:value="element.value"
            placeholder="Valor"
            :status="isValid(element.value) ? 'success' : 'error'"
            @input="(val) => onInput(val, index, 'value')"
          />
        </n-form-item>
        <n-button color="red" @click="removeElement(index)">
          <template #icon>
            <n-icon :component="DeleteFilled" />
          </template>
        </n-button>
      </n-gi>
    </n-grid>

    <div style="width: calc(100% - 1rem); display: flex; justify-content: center;">
      <n-button size="large" color="#0D5A79" @click="addElement">Agregar Elemento</n-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NGrid, NGi, NFormItem, NInput, NButton, NIcon } from "naive-ui";
import { DeleteFilled } from "@vicons/material";

export default defineComponent({
  components: {
    NGrid,
    NGi,
    NFormItem,
    NInput,
    NButton,
    NIcon
  },
  setup(_, { expose }) {
    const elements = ref([{ name: '', value: '' }]);

    const allowedRegex = /^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ.,()¿?¡!\s]*$/;

    const onInput = (val, index, field) => {
      const filtered = val.replace(/[^a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ.,()¿?¡!\s]/g, '');
      elements.value[index][field] = filtered;
    };

    const isValid = (text) => {
      return text.trim() !== '' && allowedRegex.test(text);
    };

    const getFeedback = (text) => {
      return isValid(text) ? '' : 'Solo letras, números y signos permitidos';
    };

    const addElement = () => {
      elements.value.push({ name: '', value: '' });
    };

    const removeElement = (index) => {
      if (elements.value.length > 1) {
        elements.value.splice(index, 1);
      }
    };

    expose({
      getData: () => ({
        elements: elements.value.map(e => ({
          name: e.name,
          value: e.value
        }))
      })
    });

    return {
      elements,
      addElement,
      removeElement,
      onInput,
      isValid,
      getFeedback,
      DeleteFilled
    };
  }
});
</script>
