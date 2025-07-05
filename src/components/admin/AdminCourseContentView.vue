<template>
    <h2 class="text-xl">Contenido del curso</h2>
</template>
<script>
import { defineComponent } from 'vue';
import { inject } from 'vue';
export default defineComponent({
    name: 'AdminCourseContentView',
    setup() {
        const currentStep = inject('step');
        currentStep.value = 3;
    }
});
</script>