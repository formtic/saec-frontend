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
                <n-form-item label="Fecha" :show-feedback="false" :show-label="true" class="compact-form-item">
                  <n-input :value="formData.date" placeholder="01-01-2023" disabled />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="Diagrammeño" :show-feedback="false" :show-label="true" class="compact-form-item">
                  <n-input :value="formData.department" placeholder="Nombre del departamento" disabled />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="Instructor" :show-feedback="false" :show-label="true" class="compact-form-item">
                  <n-input :value="formData.instructor" placeholder="Omar de Jesús Santander Vestayas" disabled />
                </n-form-item>
              </n-gi>
            </n-grid>

            <n-grid :cols="2" :x-gap="12" :y-gap="16" responsive="screen">
              <n-gi>
                <n-form-item label="Código de empleado" :show-feedback="false" :show-label="true"
                  class="compact-form-item">
                  <n-input :value="formData.employeeCode" placeholder="41.2" disabled />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="Nombre de empleado" :show-feedback="false" :show-label="true"
                  class="compact-form-item">
                  <n-input :value="formData.employeeName" placeholder="Ulises Daniel García México" disabled />
                </n-form-item>
              </n-gi>
            </n-grid>

            <n-grid :cols="3" :x-gap="12" :y-gap="16" responsive="screen" style="margin-bottom: -8px">
              <n-gi>
                <n-form-item label="Formato" :show-feedback="false" :show-label="true" class="compact-form-item">
                  <n-input :value="formData.format" placeholder="FEBR/09-02/03/4.5" disabled />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="Revisión" :show-feedback="false" :show-label="true" class="compact-form-item">
                  <n-input :value="formData.revision" placeholder="2" disabled />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="Fecha Efectiva" :show-feedback="false" :show-label="true" class="compact-form-item">
                  <n-input :value="formData.effectiveDate" placeholder="02-06-2022" disabled />
                </n-form-item>
              </n-gi>
            </n-grid>
          </n-form>
        </n-space>
      </n-card>

      <SimpleRelationQuestion class="question-component" />
      <SimpleSelectQuestion class="question-component" />
      <MultipleSelectQuestion class="question-component" />
      <OrderQuestionEmployee class="question-component" />
      <MultipleOrderQuestion class="question-component" />
      <MultipleRelationQuestion class="question-component" />
      <OpenQuestion class="question-component" />
      <MultipleOpenQuestion class="question-component" />

    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import SimpleSelectQuestion from "../../components/employee/SimpleSelectQuestion.vue";
import MultipleSelectQuestion from "../../components/employee/MultipleSelectQuestion.vue";
import OrderQuestionEmployee from "../../components/employee/OrderQuestionEmployee.vue";
import OpenQuestion from "../../components/employee/OpenQuestion.vue";
import MultipleOpenQuestion from "../../components/employee/MultipleOpenQuestion.vue";
import MultipleRelationQuestion from "../../components/employee/MultipleRelationQuestion.vue";
import SimpleRelationQuestion from "../../components/employee/SimpleRelationQuestion.vue";
import MultipleOrderQuestion from "../../components/employee/MultipleOrderQuestion.vue";
import {
  NCard,
  NText,
  NSpace,
  NForm,
  NFormItem,
  NInput,
  NGrid,
  NGi
} from "naive-ui";

export default defineComponent({
  components: {
    NCard,
    NText,
    NSpace,
    NForm,
    NFormItem,
    NInput,
    NGrid,
    NGi,
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

    return {
      formData
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