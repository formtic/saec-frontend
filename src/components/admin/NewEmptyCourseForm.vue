<template>

    <n-form ref="formRef" :model="model" :rules="rules" @submit.prevent="handleValidateCourseForm">

        <n-space vertical>
            <n-form-item path="name" label="Nombre del curso">
                <n-input v-model:value="model.name" type="text" placeholder="Nombre del curso" />
            </n-form-item>
            <n-form-item path="description" label="Objetivo del curso">
                <n-input v-model:value="model.description" type="text" placeholder="Objetivo del curso" />
            </n-form-item>
            <n-form-item path="teacher" label="Evaluador">
                <n-select v-model:value="model.teacher" :options="teachers" filterable clearable
                    placeholder="Selecciona un evaluador" label-field="fullname" value-field="id" />
            </n-form-item>
            <n-flex justify="center">
                <n-button type="primary" attr-type="submit">
                    Guardar cambios
                </n-button>
            </n-flex>
        </n-space>
    </n-form>

</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { NForm, NFormItem, NGrid, NGridItem, NInput, NSelect } from 'naive-ui';
import { findAllByStatus } from '../../service/teacherService.js';
import { findTestsByStatus } from '../../service/testService.js';
import { create } from '../../service/courseService.js';

export default defineComponent({
    name: 'NewCourseForm',
    components: {
        NGrid,
        NGridItem,
        NForm,
        NFormItem,
        NSelect,
        NInput,
    },
    setup() {
        const router = useRouter();
        const formRef = ref(null);
        const teachers = ref(null);
        const tests = ref(null);
        const model = ref(
            {
                name: '',
                description: '',
                teacher: null,
                test: null,
            }
        );

        const rules = {
            name: [
                {
                    required: true,
                    message: 'El nombre del curso es obligatorio',
                    trigger: ['input', 'blur']
                }
            ],
            description: [
                {
                    required: true,
                    message: 'El objetivo del curso es obligatorio',
                    trigger: ['input', 'blur']
                }
            ],
            teacher: [
                {
                    required: true,
                    message: 'Seleccione un evaluador',
                    trigger: ['input', 'blur']
                }
            ]
        }

        const getTeachers = async () => {
            await findAllByStatus('ENABLED').then(response => {
                teachers.value = response.data;
            });
        };

        const getTests = async () => {
            await findTestsByStatus('CREATED').then(response => {
                tests.value = response.data;
            });
        }

        const handleValidateCourseForm = (e) => {
            e.preventDefault();
            formRef.value?.validate(errors => {
                if (!errors) {
                    createCourse();
                }
            });
        }

        const createCourse = async () => {
            const payload = {
                name: model.value.name,
                description: model.value.description,
                teacherId: model.value.teacher,
                testId: model.value.test ?? ''
            };
            await create(payload);
        }
        onMounted(() => {
            getTeachers();
            getTests();
        });
        return {
            formRef,
            model,
            teachers,
            tests,
            rules,
            handleValidateCourseForm
        }
    }
});
</script>