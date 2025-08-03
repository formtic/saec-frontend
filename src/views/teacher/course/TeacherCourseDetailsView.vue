<template>
    <n-space vertical size="medium">
        <n-text class="text-xl font-semibold">
            {{ course?.name }}
        </n-text>
        <div class="overflow-hidden">
            {{ course?.description }}
        </div>
        <div class="rounded-lg border-3 border-primary-900 mt-2">
            <n-tabs type="segment" animated>
                <n-tab-pane name="sections" tab="Secciones">
                    <n-space justify="space-between" class="ps-4 pt-4 pe-4">
                        <div class="flex items-center">
                            <n-icon :component="InfoOutlined" size="18" color="#187dac" class="me-2" />
                            <n-text class="text-lg font-semibold text-primary-700">Modifique las secciones del
                                curso</n-text>
                        </div>
                        <div>
                            <n-text class="font-semibold">
                                Reordenar
                            </n-text>
                            <n-switch v-model:value="enableSectionSorting"></n-switch>
                        </div>
                    </n-space>
                    <TeacherCourseSectionListTable :sort-sections="enableSectionSorting" :sections="sections"/>
                    <n-flex justify="center" class="mb-4 ps-4 pe-4 h-[50px]">
                        <n-button block class="h-full" @click="router.push(`/teacher/courses/details/${props?.id}/set`)">
                            <n-icon :component="AddCircleOutline" size="32"></n-icon>
                        </n-button>
                    </n-flex>
                </n-tab-pane>
                <n-tab-pane name="asignations" tab="Asignaciones">
                </n-tab-pane>
            </n-tabs>
        </div>
    </n-space>
</template>

<script setup>
import { BookFilled, InfoOutlined } from '@vicons/material';
import { inject, onMounted, ref } from 'vue';
import { findById } from '../../../service/courseService';
import TeacherCourseSectionListTable from '../../../components/teacher/course/TeacherCourseSectionListTable.vue';
import { AddCircleOutline } from '@vicons/ionicons5';
import { findSectionsByCourseId } from '../../../service/CourseSectionService';
import { useRouter } from 'vue-router';

const breadCrumbItems = inject('breadcrumbItems');
const props = defineProps(['id']);
const course = ref(null);
const router = useRouter();
breadCrumbItems.value = [
    {
        icon: BookFilled,
        label: 'Cursos',
        path: '/teacher/courses'
    },
    {
        icon: InfoOutlined,
        label: 'Detalles del curso',
    }
];
const pageTitle = inject('pageTitle');
const enableSectionSorting = ref(false);
const sections = ref([]);
pageTitle.value = 'Curso'

const fetchCourseInfo = async () => {
    await findById(props?.id ?? '')
        .then(response => {
            course.value = response.data;
            breadCrumbItems.value[1] = { icon: InfoOutlined, label: course.value.name }
        });
}

const fetchSections = async() => {
    await findSectionsByCourseId(props?.id)
    .then(response => sections.value = response.data);
}

onMounted(() => {
    fetchCourseInfo();
    fetchSections();
});
</script>