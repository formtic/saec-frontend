<template>
    <div class="px-4">
        <div class="admin-header pt-4 pb-4 w-full">
            <n-breadcrumb class="admin-breadcrumb">
                <n-breadcrumb-item @click="router.push('/admin/courses')">
                    <n-icon :component="BookFilled" />
                    Cursos
                </n-breadcrumb-item>
                                <n-breadcrumb-item>
                    {{course?.name}}
                </n-breadcrumb-item>
            </n-breadcrumb>
            <h1 class="admin-title">Curso</h1>
        </div>
        <n-space vertical>
            <n-steps v-model:current="currentStep" :on-update:current="updateStep">
                <n-step title="Información del curso" description="Indique la información general del curso">
                    <template #icon>
                        <n-icon :component="InfoOutlined" />
                    </template>
                </n-step>
                <n-step title="Examen" description="Editar examen">
                    <template #icon>
                        <n-icon :component="EditNoteFilled" />
                    </template>
                </n-step>
                <n-step title="Contenido" description="Secciones del curso">
                    <template #icon>
                        <n-icon :component="LibrarySharp" />
                    </template>
                </n-step>
                <n-step title="Asignaciones" description="Asignar curso a empleados">
                    <template #icon>
                        <n-icon :component="TaskOutlined" />
                    </template>
                </n-step>

            </n-steps>
        </n-space>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { BookFilled, EditNoteFilled, InfoOutlined, TaskOutlined } from '@vicons/material';
import { NBreadcrumb, NBreadcrumbItem, NIcon, NSpace, NStep, NSteps } from 'naive-ui';
import { LibrarySharp } from '@vicons/ionicons5';
import { ref, defineProps, onMounted } from 'vue';
import { findById } from '../../service/courseService';

const router = useRouter();
const currentStep = ref(3);
const course = ref(null);
const props = defineProps(['id']);

onMounted(async () => {
    const id = props.id ?? '';
    if(id) {
        await findById(id)
        .then(response => {
            course.value = response.data;
        });
    }
});
const updateStep = (step) => {
    currentStep.value = step;
}
</script>