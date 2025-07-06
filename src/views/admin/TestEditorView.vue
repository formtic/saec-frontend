<template>
    <div class="p-4">
        <n-form-item label="Nombre del examen" required>
            <n-input placeholder="Nombre del examen" />
        </n-form-item>
        <n-grid :cols="2">
            <n-gi>
                <n-form-item label="Versión" required>
                    <n-input placeholder="Versión del examen" />
                </n-form-item>
                <n-form-item label="Duración" required>
                    <n-select placeholder="Selecciona el tiempo de evaluación" />
                </n-form-item>
            </n-gi>
            <n-gi style="padding-left: 25px;">
                <n-form-item label="Logo del examen">
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
                            <p style="color:#778C96">Máximo 5MB</p>
                        </n-upload-dragger>
                    </n-upload>
                </n-form-item>
            </n-gi>
        </n-grid>
        <div style="width: calc(100% - 1rem); display: flex; justify-content: center; gap: 1rem; margin-bottom: 30px">
            <n-button color="#0D5A79" style="border-radius: 8px">Vista Previa</n-button>
        </div>
        <QuestionContainer v-for="(quesiton, index) in questions" :key="quesiton.id" @remove="removeQuesiton(index)" />
        <div style="width: calc(100% - 1rem); display: flex; justify-content: center; gap: 1rem;">
            <n-button color="#0D5A79" size="large" style="border-radius: 8px" @click="addQuestion">Nueva
                Pregunta</n-button>
            <n-button color="#0D5A79" size="large" style="border-radius: 8px">Continuar registro</n-button>
        </div>
    </div>
</template>

<script scoped>
import { defineComponent, ref, inject } from "vue";
import { BookFilled, AddCircleFilled, DeleteFilled } from "@vicons/material";
import { NBreadcrumb, NBreadcrumbItem, NIcon, NFormItem, NInput, NGrid, NGi, NSelect, NUpload, NUploadDragger, NDatePicker, NButton, } from "naive-ui";
import { useRouter } from "vue-router";
import QuestionContainer from "../../components/admin/QuestionContainer.vue";

export default defineComponent({
    components: {
        NBreadcrumb,
        NBreadcrumbItem,
        NIcon,
        NFormItem,
        NInput,
        NGrid,
        NGi,
        NSelect,
        NUpload,
        NUploadDragger,
        AddCircleFilled,
        NDatePicker,
        NButton,
        DeleteFilled,
        QuestionContainer
    },
    setup() {
        const currentStep = inject('step');
        currentStep.value = 2;
        const router = useRouter();
        const navigateBack = () => {
            router.replace("/admin/courses");
        };
        const questions = ref([{ id: Date.now() }]);

        const addQuestion = () => {
            questions.value.push({ id: Date.now() });
        };

        const removeQuesiton = (index) => {
            if (questions.value.length > 1) {
                questions.value.splice(index, 1);
            }
        };

        return {
            BookFilled,
            navigateBack,
            AddCircleFilled,
            DeleteFilled,
            addQuestion,
            removeQuesiton,
            questions,
        };
    },
});
</script>

<style scoped>
.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.admin-title {
    font-size: 3.5rem;
    font-weight: bold;
    color: #0d5a79;
}

@media (max-width: 886px) {
    .admin-header {
        justify-content: center;
    }

    .admin-breadcumb {
        display: none;
    }
}
</style>
