<template>
    <n-form ref="formRef" :model="model" :rules="rules" class="mb-4" @submit.prevent="handleSubmit">
        <n-space vertical>
            <n-form-item label="Nombre" path="name">
                <n-input placeholder="Nombre de la sección" v-model:value="model.name" />
            </n-form-item>
            <n-form-item label="Descripción" path="description">
                <n-input placeholder="Resumen de la sección" type="textarea" size="large" :rows="3"
                    :autosize="{ minRows: 3, maxRows: 3 }" v-model:value="model.description" />
            </n-form-item>
            <n-space item-class="w-full md:flex-1 mt-2" size="large">
                <n-form-item label="Video" path="video">
                    <n-upload directory-dnd :max="1" ref="fileVideo" accept=".mp4"
                        :on-change="data => handleFileChange(data, 'video')">
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
                <n-form-item label="Presentación" path="presentation">
                    <n-upload directory-dnd max="1" ref="filePresentation" accept=".pdf"
                        :on-change="data => handleFileChange(data, 'presentation')">
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
                                Solo se permiten archivos .pdf
                            </n-text>
                        </n-upload-dragger>
                    </n-upload>
                </n-form-item>
            </n-space>
            <div class="flex justify-center">
                <n-button type="primary" attr-type="submit">
                    <div class="w-35">
                        Guardar cambios
                    </div>
                </n-button>
            </div>
        </n-space>
        <n-image src="C:/Users/Antonio/files/CIENCIAS_OLGUIN_Tecnologia_en_el_Aprendizaje_1.pdf">
        </n-image>
    </n-form>
</template>
<script setup>
import { BookOutline, PencilOutline } from '@vicons/ionicons5';
import { AddOutlined, ArchiveFilled, BookFilled } from '@vicons/material';
import { ref, inject, onMounted } from 'vue';
import { createCourseSection, findSectionDetailsById, updateCourseSection } from '../../../service/CourseSectionService';
import { uploadSectionFiles } from '../../../service/fileService';
const breadCrumbItems = inject('breadcrumbItems');
const pageTitle = inject('pageTitle');
const currentPath = inject('module');
const props = defineProps({
    course_id: String,
    id: String
});
const formRef = ref(null);
const fileVideo = ref({
    file: null
});
const filePresentation = ref({
    file: null
});
const model = ref({
    name: '',
    description: '',
    url_video: '',
    url_presentation: ''
});

const rules = {
    name: [
        {
            required: true,
            message: 'El nombre es requerido',
            trigger: ['input', 'blur']
        }
    ],
    description: [
        {
            required: true,
            message: 'Agregue una descripción',
            trigger: ['input', 'blur']
        }
    ],
    presentation: [
        {
            required: true,
            validator() {
                if (!filePresentation.value?.file) {
                    return new Error('Debe agregar una presentación en PDF');
                }
                if (filePresentation.value.file.size >= 5200000) {
                    return new Error('El limite es de 5mb')
                }
                if (filePresentation.value.file.type !== 'application/pdf') {
                    return new Error('Solo se permiten archivos PDF');
                }
                return true;
            }
        }
    ],
    video: [
        {
            validator() {
                if (fileVideo.value?.file) {
                    if (fileVideo.value.file.size >= 10200000) {
                        return new Error('El limite es de 10mb')
                    }
                    if (fileVideo.value.type !== 'video/mp4') {
                        return new Error('Solo se peremiten archivos mp4');
                    }
                }
                return true;
            }
        }
    ]

}

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
        label: props.id ? 'Editar sección' : 'Nueva sección'
    }
]
currentPath.value = 'courses';

const handleSubmit = () => {
    formRef.value?.validate((errors) => {
        if (!errors) {
            submitFiles();
        }
    });
}

const handleFileChange = ({ file }, ref) => {
    ({
        'video': () => fileVideo.value = file.status === 'removed' ? null : file.file,
        'presentation': () => filePresentation.value.file = file.status === 'removed' ? null : file.file,
    })[ref]?.();
    formRef.value?.validate();
}

const submitFiles = async () => {
    await uploadSectionFiles(fileVideo.value?.file ?? null, filePresentation.value.file)
        .then(response => {
            const data = response.data;
            model.value.url_presentation = data.pathPresentation ?? '';
            model.value.url_video = data.pathVideo ?? '';
            submitCourseSection();
        });
}

const submitCourseSection = async () => {
    const payload = {
        name: model.value.name,
        description: model.value.description,
        url_video: model.value.url_video,
        url_presentation: model.value.url_presentation,
        courseId: props.course_id
    };
    if (props.id) {
        await updateCourseSection(payload, props.id).then(() => { return });
    } else {
        await createCourseSection(payload);
    }
}

const fetchCourseSection = async () => {
    await findSectionDetailsById(props?.id)
        .then(response => {
            const data = response.data;
            breadCrumbItems.value[2].label = data.name;
            model.value.name = data.name;
            model.value.description = data.description;
        });
}

onMounted(() => {
    if (props.id) {
        fetchCourseSection();
    }
});




</script>