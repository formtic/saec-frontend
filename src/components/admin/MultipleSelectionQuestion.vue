<template>
  <div>
    <div v-for="(answer, index) in answers" :key="index"
      style="display: flex; width: 100%; align-items: center; gap: 15px; margin-bottom: 20px">
      <n-checkbox v-model:checked="answer.isCorrect" />
      <n-input v-model:value="answer.text" placeholder="Respuesta" :status="isValid(answer.text) ? 'success' : 'error'"
        @input="(val) => onInput(val, index)" style="flex-grow: 1" />
      <n-button color="red" @click="removeAnswer(index)">
        <template #icon>
          <n-icon :component="DeleteFilled" />
        </template>
      </n-button>
    </div>

    <div style="width: calc(100% - 1rem); display: flex; justify-content: center;">
      <n-button color="#0D5A79" @click="addAnswer">Agregar Respuesta</n-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NCheckbox, NInput, NButton, NIcon } from "naive-ui";
import { DeleteFilled } from "@vicons/material";

export default defineComponent({
  components: {
    NCheckbox,
    NInput,
    NButton,
    NIcon
  },
  setup(_, { expose }) {
    const answers = ref([{ isCorrect: false, text: '' }]);

    const allowedRegex = /^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ.,()¿?¡!\s]*$/;

    const onInput = (val, index) => {
      const filtered = val.replace(/[^a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ.,()¿?¡!\s]/g, '');
      answers.value[index].text = filtered;
    };

    const isValid = (text) => {
      return text.trim() !== '' && allowedRegex.test(text);
    };

    const addAnswer = () => {
      answers.value.push({ isCorrect: false, text: '' });
    };

    const removeAnswer = (index) => {
      if (answers.value.length > 2) {
        answers.value.splice(index, 1);
      }
    };


    expose({
      getData: () => {
        const correctIndices = answers.value
          .map((a, index) => (a.isCorrect ? index : -1))
          .filter(index => index !== -1);

        return {
          answers: answers.value.map(a => a.text),
          correctAnswers: {
            answerType: "CHOICE_ANSWER",
            answers: correctIndices
          },
          numberOfChoices: correctIndices.length
        };
      }
    });

    return {
      answers,
      addAnswer,
      removeAnswer,
      onInput,
      isValid,
      DeleteFilled
    };
  }
});
</script>
