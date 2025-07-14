<template>
  <div style="width: calc(100% - 1rem); padding: 10px; border-radius: 10px; border-style: dashed;
           border-width: 2px; border-color: #0D5A79; margin-bottom: 20px;">
    <!-- Botón para eliminar la pregunta -->
    <div style="display: flex; justify-content: flex-end; margin-bottom: 10px">
      <n-button color="red" @click="$emit('remove')">
        <template #icon>
          <n-icon :component="DeleteFilled" />
        </template>
      </n-button>
    </div>

    <n-grid :cols="2">
      <!-- Columna izquierda: tipo y texto de la pregunta -->
      <n-gi>
        <n-form-item label="Tipo de pregunta" required style="margin-top: 3rem;">
          <n-select :options="questionTypes" v-model:value="selectedQuestionType" @update:value="handleChangeType" />
        </n-form-item>

        <n-form-item label="Pregunta" required>
          <n-input v-model:value="questionText" placeholder="Escribe la pregunta" />
        </n-form-item>
      </n-gi>

      <!-- Columna derecha: imagen -->
      <n-gi style="padding-left: 25px">
        <n-form-item label="Imagen">
          <n-upload @change="handleUploadChange">
            <n-upload-dragger>
              <div style="margin-bottom: 12px">
                <n-icon size="48">
                  <AddCircleFilled />
                </n-icon>
              </div>
              <p style="font-size: 16px">
                Arrastra tu imagen aquí, o
                <span style="color: #1D8EC6">haz clic para seleccionar</span>
              </p>
              <p style="color: #778C96">Máximo 5MB</p>
            </n-upload-dragger>
          </n-upload>
        </n-form-item>
      </n-gi>
    </n-grid>

    <!-- Subcomponente dinámico según el tipo de pregunta -->
    <component :is="currentQuestionComponent" ref="childComponentRef" :key="componentKey" />
  </div>
</template>

<script>
import { defineComponent, ref, computed, nextTick } from "vue";
import {
  NButton,
  NIcon,
  NGrid,
  NGi,
  NSelect,
  NFormItem,
  NInput,
  NUpload,
  NUploadDragger,
  NRadio
} from "naive-ui";
import { DeleteFilled, AddCircleFilled } from "@vicons/material";

import IdentifierQuestion from "./IdentifierQuestion.vue";
import SimpleSelectionQuestion from "./SimpleSelectionQuestion.vue";
import MultipleSelectionQuestion from "./MultipleSelectionQuestion.vue";
import OrderQuestion from "./OrderQuestion.vue";
import SimpleMatchQuestion from "./SimpleMatchQuestion.vue";
import MultipleMatchQuestion from "./MultipleMatchQuestion.vue";
import SimpleOpenQuestion from "./SimpleOpenQuestion.vue";
import MultipleOpenQuestion from "./MultipleOpenQuestion.vue";

export default defineComponent({
  name: "QuestionContainer",
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
    DeleteFilled,
    IdentifierQuestion,
    SimpleSelectionQuestion,
    MultipleSelectionQuestion,
    OrderQuestion,
    SimpleMatchQuestion,
    MultipleMatchQuestion,
    SimpleOpenQuestion,
    MultipleOpenQuestion
  },
  setup(_, { expose }) {
    const selectedQuestionType = ref("identifierQuestion");
    const questionText = ref("");
    const uploadedImage = ref(null);
    const childComponentRef = ref(null);
    const componentKey = ref(0);

    // Opciones visibles del selector
    const questionTypes = [
      { label: "Identificación de elementos", value: "identifierQuestion" },
      { label: "Pregunta de selección simple", value: "simpleSelectionQuestion" },
      { label: "Pregunta de selección múltiple", value: "multipleSelectionQuestion" },
      { label: "Pregunta de ordenamiento", value: "orderQuestion" },
      { label: "Emparejamiento simple", value: "simpleMatchQuestion" },
      { label: "Emparejamiento múltiple", value: "multipleMatchQuestion" },
      { label: "Pregunta abierta", value: "simpleOpenQuestion" },
      { label: "Pregunta abierta múltiple", value: "multipleOpenQuestion" }
    ];

    // Mapeo interno -> tipo real deseado
    const questionTypeMap = {
      identifierQuestion: "IDENTIFIER_QUESTION",
      simpleSelectionQuestion: "SIMPLE_CHOICE_QUESTION",
      multipleSelectionQuestion: "MULTIPLE_CHOICE_QUESTION",
      orderQuestion: "SORT_QUESTION",
      simpleMatchQuestion: "SIMPLE_MATCH_QUESTION",
      multipleMatchQuestion: "MULTIPLE_MATCH_QUESTION",
      simpleOpenQuestion: "SINGLE_OPEN_QUESTION",
      multipleOpenQuestion: "MULTIPLE_OPEN_QUESTION"
    };

    const questionComponents = {
      identifierQuestion: "IdentifierQuestion",
      simpleSelectionQuestion: "SimpleSelectionQuestion",
      multipleSelectionQuestion: "MultipleSelectionQuestion",
      orderQuestion: "OrderQuestion",
      simpleMatchQuestion: "SimpleMatchQuestion",
      multipleMatchQuestion: "MultipleMatchQuestion",
      simpleOpenQuestion: "SimpleOpenQuestion",
      multipleOpenQuestion: "MultipleOpenQuestion"
    };

    const currentQuestionComponent = computed(() => {
      return questionComponents[selectedQuestionType.value] || "IdentifierQuestion";
    });

    const handleChangeType = async (newType) => {
      selectedQuestionType.value = newType;
      componentKey.value++; // Forzar re-render
      await nextTick();
    };

    const handleUploadChange = (options) => {
      uploadedImage.value = options.file.file;
    };

    const getData = async () => {
      await nextTick();

      const baseData = {
        questionType: questionTypeMap[selectedQuestionType.value] || selectedQuestionType.value,
        title: questionText.value,
        image: uploadedImage.value
      };

      if (!childComponentRef.value?.getData) {
        console.warn("Componente hijo no expone getData");
        return baseData;
      }

      try {
        const childData = await childComponentRef.value.getData();
        return { ...baseData, ...childData };
      } catch (error) {
        console.error("Error al obtener datos del hijo:", error);
        return baseData;
      }
    }

    expose({ getData });

    return {
      selectedQuestionType,
      questionText,
      uploadedImage,
      questionTypes,
      questionTypeMap,
      currentQuestionComponent,
      handleChangeType,
      handleUploadChange,
      childComponentRef,
      componentKey,
      DeleteFilled,
      AddCircleFilled
    };
  }
});
</script>
