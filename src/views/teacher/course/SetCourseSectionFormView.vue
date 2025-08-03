<template>
    <n-form ref="formRef"class="mb-4">
        <n-space vertical>
            <n-form-item label="Nombre">
                <n-input placeholder="Nombre de la sección" />
            </n-form-item>
            <n-form-item label="Descripción">
                <n-input placeholder="Resumen de la sección" type="textarea" size="large" :rows="3"
                    :autosize="{ minRows: 3, maxRows: 3 }" />
            </n-form-item>
            <n-space item-class="w-full md:flex-1" size="large">
                <n-form-item label="Video">
                    <n-upload multiple directory-dnd action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :max="1" class="w-full">
                        <n-upload-dragger>
                            <div style="margin-bottom: 12px">
                                <n-icon size="48" :depth="3">
                                    <ArchiveFilled />
                                </n-icon>
                            </div>
                            <n-text class="text-md font-semibold">
                                Haga click o arrastre el archivo
                            </n-text>
                            <br>
                            <n-text class="text-xs">
                                Solo se permiten archivos .mp4
                            </n-text>
                        </n-upload-dragger>
                    </n-upload>
                </n-form-item>
                <n-form-item label="Presentación">
                    <n-upload multiple directory-dnd action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :max="1">
                        <n-upload-dragger>
                            <div style="margin-bottom: 12px">
                                <n-icon size="48" :depth="3">
                                    <ArchiveFilled />
                                </n-icon>
                            </div>
                            <n-text class="text-md font-semibold">
                                Haga click o arrastre el archivo
                            </n-text>
                            <br>
                            <n-text class="text-xs">
                                Solo se permiten archivos .mp4
                            </n-text>
                        </n-upload-dragger>
                    </n-upload>
                </n-form-item>
            </n-space>
        </n-space>
    </n-form>
</template>
<script setup>
import { BookOutline, PencilOutline } from '@vicons/ionicons5';
import { AddOutlined, ArchiveFilled, BookFilled } from '@vicons/material';
import { ref, inject } from 'vue';
import { findSectionDetailsById } from '../../../service/CourseSectionService';
const breadCrumbItems = inject('breadcrumbItems');
const pageTitle = inject('pageTitle');
const currentPath = inject('module');
const props = defineProps({
    course_id: String,
    id: String
});
const section = ref(null);
const formRef = ref(null);
const model = ref({
    name: '',
    description: '',
});

pageTitle.value = 'Sección del curso';
breadCrumbItems.value = [
    {
        icon: BookFilled,
        label: 'Cursos',
        path: '/teacher/courses'
    },
    {
        icon: BookOutline,
        label: 'Secciones',
        path: `/teacher/courses/details/${props.course_id}`
    },
    {
        icon: props.id ? PencilOutline : AddOutlined,
        label: props.id ? section.value?.name : 'Nueva sección'
    }
]
currentPath.value = 'courses';

const fetchCourseSection = async () => {
    await findSectionDetailsById(props?.id)
        .then(response => section.value = response.data);
}


</script>