<template>
    <div>
        <div v-for="(answer, index) in answers" :key="index"
            style="display: flex; width: 100%; align-items: center; gap: 15px; margin-bottom: 20px">
            <n-checkbox v-model:checked="answer.isCorrect" />
            <n-input v-model:value="answer.text" placeholder="Respuesta" />
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
    setup() {
        const answers = ref([{isCorrect: false, text: ''}]);
        const addAnswer = () => {
            answers.value.push({ isCorrect: false, text: ''});
        };

        const removeAnswer = (index) => {
            if (answers.value.length > 2) {
                answers.value.splice(index, 1);
            }
        };

        return {
            answers,
            addAnswer,
            removeAnswer,
            DeleteFilled
        }
    }
})
</script>