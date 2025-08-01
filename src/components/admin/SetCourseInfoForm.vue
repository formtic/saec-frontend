<template>
    <n-form ref="formRef" :model="model" :rules="rules" @submit.prevent=handleSubmit>
        <n-space vertical>
            <n-form-item path="name" type="text" label="Nombre del curso">
                <n-input v-model:value="model.name" type="text" placeholder="Nombre del curso" />
            </n-form-item>
            <n-form-item path="description" type="text" label="Objetivo del curso">
                <n-input v-model:value="model.description" type="text" placeholder="Describa el objetivo del curso" />
            </n-form-item>
            <n-form-item path="teacher" label="Evaluador">
                <n-select v-model:value="model.teacher" :options="teachers" filterable clearable value-field="id"
                    label-field="fullname"></n-select>
            </n-form-item>
            <n-flex justify="center">
                <n-button type="primary" attr-type="submit"> Guardar cambios</n-button>
            </n-flex>
        </n-space>
    </n-form>
</template>

<script>
import { defineComponent, onMounted, ref, inject, watch } from 'vue';
import { NForm, NFormItem, NInput, NSelect, NSpace } from 'naive-ui';
import { findAllByStatus } from '../../service/teacherService';
import { updateInfo } from '../../service/courseService';
export default defineComponent({
    name: 'SetCourseInfoForm',
    components: {
        NForm,
        NFormItem,
        NInput,
        NSelect,
        NSpace
    },
    setup() {
        const course = inject('course');
        const currentStep = inject('step');
        currentStep.value = 1;
        const formRef = ref(null);
        const teachers = ref([]);
        const model = ref({
            name: '',
            description: '',
            teacher: '',
        });

        watch(course, (c) => {
            if (c) {
                model.value.name = c.name;
                model.value.description = c.description;
                model.value.teacher = c.teacher?.id;
            }
        }, { immediate: true })

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
                    message: 'Selecciona un docente evaluador'
                }
            ]
        };

        const getTeachers = async () => {
            await findAllByStatus('ENABLED')
                .then(response => {
                    teachers.value = response.data;
                });
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            formRef.value?.validate(errors => {
                if (!errors) updateCourseInfo();
            });
        }

        const updateCourseInfo = async () => {
            const payload = {
                name: model.value.name.trim(),
                description: model.value.description.trim(),
                teacherId: model.value.teacher
            }

            await updateInfo(payload, course.value.id)
        }
        onMounted(() => {
            getTeachers();
        });
        return {
            formRef,
            model,
            teachers,
            rules,
            course,
            handleSubmit
        }
    },
});
</script>