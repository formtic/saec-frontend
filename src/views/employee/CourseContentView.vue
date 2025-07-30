<template>
    <div class="container">
        <div class="form-card">
            <n-collapse accordion>
                <!-- Secciones del curso -->
                <n-collapse-item v-for="(item, index) in items" :key="index" class="custom-collapse-item">
                    <template #header>
                        <div class="header-content">
                            <span>{{ item.name }}</span>
                            <div class="header-right">
                                <n-button size="tiny" @click.stop="navigateToSection(item.id)">
                                    IR
                                </n-button>
                            </div>
                        </div>
                    </template>

                    <n-text depth="3" class="description">{{ item.description }}</n-text>
                </n-collapse-item>

                <!-- Elemento para el examen (añadido al final) -->
                <n-collapse-item class="custom-collapse-item">
                    <template #header>
                        <div class="header-content">
                            <span>Examen final</span>
                            <div class="header-right">
                                <n-button size="tiny" @click.stop="navigateToExam">
                                    IR
                                </n-button>
                            </div>
                        </div>
                    </template>
                    <n-text depth="3" class="description">Realiza el examen final para completar el curso</n-text>
                </n-collapse-item>
            </n-collapse>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { NCollapse, NCollapseItem, NButton, NText, NIcon } from 'naive-ui'
import { findSectionsByCourseId } from '../../service/CourseSectionService'
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
    name: 'CustomAccordionList',
    components: {
        NCollapse,
        NCollapseItem,
        NButton,
        NText,
        NIcon
    },
    setup() {
        const items = ref([])
        const route = useRoute();
        const router = useRouter();

        onMounted(async () => {
            try {
                const courseId = route.params.courseId;
                const response = await findSectionsByCourseId(courseId)
                console.log(response.data)
                items.value = response.data
            } catch (error) {
                console.error('Error al obtener las secciones:', error)
            }
        })
        const navigateToSection = (sectionId) => {
            const courseId = route.params.courseId;
            router.push(`/employee/courses/course-info/${courseId}/section/${sectionId}`);
        }
        const navigateToExam = () => {
            const courseId = route.params.courseId;
            router.push(`/employee/courses/course-info/${courseId}/exam`);
        };

        return {
            items,
            navigateToSection,
            navigateToExam
        }
    }
})
</script>

<style scoped>
.container {
    max-width: 1200px;
    width: 90%;
    margin: 0 auto;
    padding: 1rem;
}

.form-card {
    background: white;
    border-top: 20px solid #0D5A79;
    padding: 12px 20px;
    height: fit-content;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.description {
    margin-top: 8px;
    color: #666;
    padding: 0px 15px;
}

.custom-collapse-item {
    margin-bottom: 8px;
}

</style>