<template>
  <div>
    <div
      style="display: flex; width: 100%; align-items: center; gap: 15px; margin-bottom: 20px;"
    >
      <n-input
        v-model:value="answer.text"
        type="textarea"
        placeholder="Escribe tu pregunta..."
        :status="isValid ? 'success' : 'error'"
        @input="onInput"
        clearable
      />
    </div>
    <h3
      class="text-center w-full font-normal n-mb-6"
      style="color: #778C96;"
    >
      La respuesta correcta es solamente una propuesta, la respuesta deberá ser revisada manualmente.
    </h3>
    <p v-if="!isValid" style="color: red; font-size: 14px;">
      El texto no debe estar vacío y solo debe contener letras, números y signos permitidos.
    </p>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { NInput } from "naive-ui";

export default defineComponent({
  components: {
    NInput,
  },
  setup() {
    const answer = ref({ text: '' });

    const allowedRegex = /^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ.,()¿?¡!\s]*$/;

    const onInput = (value) => {
      const filtered = value.replace(/[^a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ.,()¿?¡!\s]/g, '');
      answer.value.text = filtered;
    };

    const isValid = computed(() => {
      return (
        answer.value.text.trim() !== '' &&
        allowedRegex.test(answer.value.text)
      );
    });

    return {
      answer,
      onInput,
      isValid,
    };
  },
});
</script>
