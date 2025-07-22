<template>
  <div class="page-container">
    <div class="form-wrapper">
      <n-card class="form-card">
        <n-space vertical :size="8">
          <n-space vertical :size="2" align="center" style="margin-top: -8px">
            <n-text tag="h1" strong style="font-size: 1.5rem; text-align: center; margin: 0; line-height: 1.2">
              INDUSTRIAS PLÁSTICAS MÉDICAS, S.A. DE C.V.
            </n-text>
            <n-text tag="h2" depth="3" style="font-size: 1.2rem; text-align: center; margin: 0; line-height: 1.2">
              Examen del MIT-106.02.02.1 ADAPTADOR CON AGUJA CAL. 20X38 Ó 18X38
            </n-text>
          </n-space>

          <n-form style="margin-bottom: -12px">
            <n-grid :cols="3" :x-gap="12" :y-gap="16" responsive="screen">
              <n-gi>
                <n-form-item label="Fecha" :show-feedback="false" class="compact-form-item">
                  <n-input :value="formData.date" disabled />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="Diagrammeño" :show-feedback="false" class="compact-form-item">
                  <n-input :value="formData.department" disabled />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="Instructor" :show-feedback="false" class="compact-form-item">
                  <n-input :value="formData.instructor" disabled />
                </n-form-item>
              </n-gi>
            </n-grid>

            <n-grid :cols="2" :x-gap="12" :y-gap="16" responsive="screen">
              <n-gi>
                <n-form-item label="Código de empleado" :show-feedback="false" class="compact-form-item">
                  <n-input :value="formData.employeeCode" disabled />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="Nombre de empleado" :show-feedback="false" class="compact-form-item">
                  <n-input :value="formData.employeeName" disabled />
                </n-form-item>
              </n-gi>
            </n-grid>

            <n-grid :cols="3" :x-gap="12" :y-gap="16" responsive="screen" style="margin-bottom: -8px">
              <n-gi>
                <n-form-item label="Formato" :show-feedback="false" class="compact-form-item">
                  <n-input :value="formData.format" disabled />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="Revisión" :show-feedback="false" class="compact-form-item">
                  <n-input :value="formData.revision" disabled />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="Fecha Efectiva" :show-feedback="false" class="compact-form-item">
                  <n-input :value="formData.effectiveDate" disabled />
                </n-form-item>
              </n-gi>
            </n-grid>
          </n-form>
        </n-space>
      </n-card>

      <!-- Preguntas dinámicas -->
      <component
        v-for="(question, index) in questions"
        :key="index"
        :is="getComponentName(question.questionType)"
        :question="question"
        class="question-component"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  NCard, NText, NSpace, NForm, NFormItem, NInput, NGrid, NGi
} from "naive-ui";

import SimpleSelectQuestion from "../../components/employee/SimpleSelectQuestion.vue";
import MultipleSelectQuestion from "../../components/employee/MultipleSelectQuestion.vue";
import OrderQuestionEmployee from "../../components/employee/OrderQuestionEmployee.vue";
import OpenQuestion from "../../components/employee/OpenQuestion.vue";
import MultipleOpenQuestion from "../../components/employee/MultipleOpenQuestion.vue";
import MultipleRelationQuestion from "../../components/employee/MultipleRelationQuestion.vue";
import SimpleRelationQuestion from "../../components/employee/SimpleRelationQuestion.vue";
import MultipleOrderQuestion from "../../components/employee/MultipleOrderQuestion.vue";

import { findTestByCouseseId } from "../../service/testService";

export default defineComponent({
  name: "ExamView",
  components: {
    NCard, NText, NSpace, NForm, NFormItem, NInput, NGrid, NGi,
    SimpleSelectQuestion,
    MultipleSelectQuestion,
    OrderQuestionEmployee,
    OpenQuestion,
    MultipleOpenQuestion,
    MultipleRelationQuestion,
    SimpleRelationQuestion,
    MultipleOrderQuestion
  },
  setup() {
    const route = useRoute();
    const formData = ref({
      date: "01-01-2023",
      department: "Nombre del departamento",
      instructor: "Omar de Jesús Santander Vestayas",
      employeeCode: "41.2",
      employeeName: "Ulises Daniel García México",
      format: "FEBR/09-02/03/4.5",
      revision: "2",
      effectiveDate: "02-06-2022"
    });
    const questions = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    onMounted(async () => {
      try {
        isLoading.value = true;
        const courseId = route.params.courseId;
        const response = await findTestByCouseseId(courseId);
        if (response.data?.questions) {
          questions.value = response.data.questions;
        }
        console.log("Examen cargado:", response.data);
      } catch (err) {
        error.value = "Error al cargar el examen";
        console.error("Error fetching test:", err);
      } finally {
        isLoading.value = false;
      }
    });

    const getComponentName = (questionType) => {
      switch (questionType) {
        case "SIMPLE_CHOICE_QUESTION":
          return "SimpleSelectQuestion";
        case "MULTIPLE_CHOICE_QUESTION":
          return "MultipleSelectQuestion";
        case "SORT_QUESTION":
          return "OrderQuestionEmployee";
        case "SINGLE_OPEN_QUESTION":
          return "OpenQuestion";
        case "MULTIPLE_OPEN_QUESTION":
          return "MultipleOpenQuestion";
        case "MULTIPLE_MATCH_QUESTION":
          return "MultipleRelationQuestion";
        case "SIMPLE_MATCH_QUESTION":
          return "SimpleRelationQuestion";
        case "IDENTIFIER_QUESTION":
          return "MultipleOrderQuestion";
        default:
          return null;
      }
    };

    return {
      formData,
      questions,
      isLoading,
      error,
      getComponentName
    };
  }
});
</script>

<style scoped>
.page-container {
  background-color: #E3F3FC;
  min-height: 100vh;
  padding: 20px 0;
  display: flex;
  justify-content: center;
}

.form-wrapper {
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-card {
  background: white;
  border-top: 20px solid #0D5A79;
  padding: 12px 20px;
  height: fit-content;
}

.question-component {
  width: 100%;
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .form-wrapper {
    width: 95%;
  }

  .form-card {
    padding: 10px 16px;
  }
}

.compact-form-item {
  --n-label-height: 22px;
  --n-label-padding: 0 0 1px;
  --n-label-margin: 0 0 2px;
}

.n-grid {
  margin-bottom: 4px;
}
</style>