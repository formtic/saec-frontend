<template>
    <div style="width: calc(100% - 1rem); padding: 10px; border-radius: 10px; border-style: dashed;
        border-width: 2px; border-color: #0D5A79; margin-bottom: 20px;">
        <div style="display: flex; justify-content: flex-end; margin-bottom: 10px">
            <n-button color="red" @click="$emit('remove')">
                <template #icon>
                    <n-icon :component="DeleteFilled" />
                </template>
            </n-button>
        </div>
        <n-grid :cols="2">
            <n-gi>
                <n-form-item label="Tipo de pregunta" required style="margin-top: 3rem;">
                    <n-select :options="questionTypes" v-model:value="selectedQuestionType" @update:value="handleChangeType"/>
                </n-form-item>
                <n-form-item label="Pregunta" required>
                    <n-input placeholder="Escribe la pregunta" />
                </n-form-item>
            </n-gi>
            <n-gi style="padding-left: 25px">
                <n-form-item label="Imagen">
                    <n-upload>
                        <n-upload-dragger>
                            <div style="margin-bottom:12px">
                                <n-icon size="48">
                                    <AddCircleFilled />
                                </n-icon>
                            </div>
                            <p style="font-size: 16px">
                                Arrastra tu imagen aquí, o
                                <span style="color: #1D8EC6">has clic para seleccionar</span>
                            </p>
                            <p style="color: #778C96">Máximo 5MB</p>
                        </n-upload-dragger>
                    </n-upload>
                </n-form-item>
            </n-gi>
        </n-grid>
        <component :is="currentQuestionComponent" />
    </div>
</template>

<script scoped>
import { defineComponent, ref, computed } from "vue";
import { NButton, NIcon, NGrid, NGi, NSelect, NFormItem, NInput, NUpload, NUploadDragger, NRadio } from "naive-ui";
import { DeleteFilled, AddCircleFilled } from "@vicons/material";
import IdentifierQuestion from "./IdentifierQuestion.vue";
import SimpleSelectionQuestion from "./SimpleSelectionQuestion.vue";
import MultipleSelectionQuestion from "./MultipleSelectionQuestion.vue";
import OrderQuestion from "./OrderQuestion.vue";

export default defineComponent({
    name: 'QuestionContainer',
    components: {
        NButton,
        NIcon,
        NGrid,
        NGi,
        NSelect,
        NFormItem,
        NInput,
        NUpload,
        NUploadDragger,
        AddCircleFilled,
        NRadio,
        IdentifierQuestion,
        SimpleSelectionQuestion,
        MultipleSelectionQuestion,
        OrderQuestion
    },
    setup(){
        const questionTypes = [
            { label: 'Identificación de elementos', value: 'identifierQuestion'},
            { label: 'Pregunta de selección simple', value: 'simpleSelectionQuestion'},
            { label: 'Pregunta de selección múltiple', value: 'multipleSelectionQuestion'},
            { label: 'Pregunta de ordenamiento', value: 'orderQuestion'},
            { label: 'Emparejamiento simple', value: 'simpleMatchQuestion'},
            { label: 'Emparejamiento múltiple', value: 'multipleMatchQuestion'},
            { label: 'Pregunta abierta', value: 'openQuestion'},
            { label: 'Pregunta abierta múltiple', value: 'openMultipleQuestion'}
        ];
        const selectedQuestionType = ref('identifierQuestion');
        const elements = ref([{
            name: '',
            value: ''
        }]);

        const questionComponents = {
            identifierQuestion: 'IdentifierQuestion',
            simpleSelectionQuestion: 'SimpleSelectionQuestion',
            multipleSelectionQuestion: 'MultipleSelectionQuestion',
            orderQuestion: 'OrderQuestion',
            simpleMatchQuestion: 'simpleMatchQuestion',
            multipleMatchQuestion: 'multipleMatchQuestion',
            openQuestion: 'openQuestion',
            openMultipleQuestion: 'openMultipleQuestion'
        }

        const currentQuestionComponent = computed(() => {
            return questionComponents[selectedQuestionType.value] || 'IdentifierQuestion';
        })

        const handleChangeType = (newType) => {
            selectedQuestionType.value = newType;
        }

        return{
            DeleteFilled,
            elements,
            questionTypes,
            selectedQuestionType,
            currentQuestionComponent,
            handleChangeType
        }
    }
})
</script>