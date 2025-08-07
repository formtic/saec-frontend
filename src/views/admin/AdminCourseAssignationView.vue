<template>
    <h2 class="text-lg">
        Asignaciones del curso
    </h2>
</template>
<script>
import { defineComponent, inject } from 'vue';

export default defineComponent({
    name: 'AdminCourseAssignationView',
    setup() {
        const currentStep = inject('step');
        currentStep.value = 4;
    }
});
</script>