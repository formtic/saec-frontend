<template>
    <div class="p-4">
        <n-form-item label="Nombre del examen" required>
            <n-input v-model:value="nombreExamen" placeholder="Nombre del examen" />
        </n-form-item>

        <n-grid :cols="2">
            <n-gi>
                <n-form-item label="Versión" required>
                    <n-input v-model:value="versionExamen" placeholder="Versión del examen" />
                </n-form-item>
                <n-form-item label="Duración" required>
                    <n-select v-model:value="duracionExamen" :options="duracionOptions"
                        placeholder="Selecciona el tiempo de evaluación" />
                </n-form-item>
            </n-gi>

            <n-gi style="padding-left: 25px;">
                <n-form-item label="Logo del examen">
                    <n-upload :max="1" :on-change="handleLogoChange" :default-upload="false">
                        <n-upload-dragger>
                            <div style="margin-bottom:12px">
                                <n-icon size="48">
                                    <AddCircleFilled />
                                </n-icon>
                            </div>
                            <p style="font-size: 16px">
                                Arrastra tu imagen aquí, o
                                <span style="color: #1D8EC6">haz clic para seleccionar</span>
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

        <QuestionContainer v-for="(question, index) in questions" :key="question.id" @remove="removeQuestion(index)"
            :ref="el => setQuestionRef(el, index)" />

        <div style="width: calc(100% - 1rem); display: flex; justify-content: center; gap: 1rem;">
            <n-button color="#0D5A79" size="large" style="border-radius: 8px" @click="addQuestion">
                Nueva Pregunta
            </n-button>
            <n-button color="#0D5A79" size="large" style="border-radius: 8px" @click="continuarRegistro">
                Continuar registro
            </n-button>
        </div>
    </div>
</template>

<script scoped>
import { defineComponent, ref, inject } from "vue";
import {
    BookFilled,
    AddCircleFilled,
    DeleteFilled
} from "@vicons/material";
import {
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
    NDatePicker,
    NButton
} from "naive-ui";
import { useRouter, useRoute } from "vue-router";
import QuestionContainer from "../../components/admin/QuestionContainer.vue";
import api from "../../config/interceptor";


const BASE_URL = import.meta.env.VITE_SPRING_API_URL;



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
        const currentStep = inject("step");
        currentStep.value = 2;

        const router = useRouter();
        const questions = ref([{ id: Date.now() }]);
        const questionRefs = ref([]);

        const route = useRoute();
        const courseId = route.params.id;


        const nombreExamen = ref("");
        const versionExamen = ref("");
        const duracionExamen = ref(null);
        const logoExamen = ref(null);

        const duracionOptions = [
            { label: '30 minutos', value: '30m' },
            { label: '1 hora', value: '1h' },
            { label: '2 horas', value: '2h' }
        ];

        const handleLogoChange = (options) => {
            logoExamen.value = options.file;
        };

        const addQuestion = () => {
            questions.value.push({ id: Date.now() });
        };

        const removeQuestion = (index) => {
            if (questions.value.length > 1) {
                questions.value.splice(index, 1);
                questionRefs.value.splice(index, 1);
            }
        };

        const setQuestionRef = (el, index) => {
            if (el) {
                questionRefs.value[index] = el;
            }
        }

        const continuarRegistro = async () => {
            const allQuestionsData = await Promise.all(
                questionRefs.value.map(async (refComp) => {
                    try {
                        if (refComp?.getData) {
                            return await refComp.getData();
                        }
                        return null;
                    } catch (error) {
                        console.error("Error al obtener datos de pregunta:", error);
                        return null;
                    }
                })
            ).then(results => results.filter(Boolean));


            var data = {
                name: nombreExamen.value,
                creationDate: new Date(),
                status: "CREATED",
                version: versionExamen.value,
                courseId: courseId,
                questions: allQuestionsData
            }


            console.log("mi dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:", data);

            try {
                
                const response = await api.post(
                    `${BASE_URL}/test/CreateExam`,
                    data,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                console.log("Examen creado exitosamente:", response.data);

            } catch (error) {
                console.error("Error al crear el examen:", error);
            }
        }






        return {
            BookFilled,
            AddCircleFilled,
            DeleteFilled,
            questions,
            addQuestion,
            removeQuestion,
            continuarRegistro,
            setQuestionRef,
            nombreExamen,
            versionExamen,
            duracionExamen,
            duracionOptions,
            handleLogoChange
        };
    }
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
