<template>
    <div>
        <h1>Vista de curso</h1>
        <n-button @click="navigateToExam" type="primary">
            Ir al examen
        </n-button>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { NButton } from "naive-ui";

export default defineComponent({
    components: { NButton },
    setup() {
        const route = useRoute();
        const router = useRouter();

        const navigateToExam = () => {
            const courseId = route.params.courseId; 
            router.push(`/employee/courses/course-info/${courseId}/exam`);
        };

        return { navigateToExam };
    },
});
</script>