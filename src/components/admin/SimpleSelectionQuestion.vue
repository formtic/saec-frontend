<template>
    <div>
        <div v-for="(answer, index) in answers" :key="index"
            style="display: flex; width: 100%; align-items: center; gap: 15px; margin-bottom: 20px;">
            <n-radio 
                :checked="answer.isCorrect" 
                @change="() => updateCorrectAnswer(index)" 
            />
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
import { NRadio, NInput, NButton, NIcon } from "naive-ui";
import { DeleteFilled } from "@vicons/material";

export default defineComponent({
    components: {
        NRadio,
        NInput,
        NButton,
        NIcon
    },
    setup() {
        const answers = ref([{ isCorrect: true, text: '' }]);

        const addAnswer = () => {
            answers.value.push({ isCorrect: false, text: '' });
        };

        const removeAnswer = (index) => {
            if (answers.value.length > 1) {
                const wasCorrect = answers.value[index].isCorrect;
                answers.value.splice(index, 1);
                
                if (wasCorrect && answers.value.length > 0) {
                    answers.value[0].isCorrect = true;
                }
            }
        };

        const updateCorrectAnswer = (index) => {
            answers.value.forEach(answer => {
                answer.isCorrect = false;
            });
            answers.value[index].isCorrect = true;
        };

        return {
            answers,
            addAnswer,
            removeAnswer,
            updateCorrectAnswer,
            DeleteFilled
        };
    }
});
</script>