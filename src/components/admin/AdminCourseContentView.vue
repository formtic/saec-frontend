<template>
    <n-text class="text-lg">Secciones del curso</n-text>
    <CourseSectionListTable :sort-sections="false" :sections="sections" />
</template>
<script>
import { defineComponent, ref } from 'vue';
import { inject } from 'vue';
import { findSectionsByCourseId } from '../../service/CourseSectionService';
import CourseSectionListTable from '../common/CourseSectionListTable.vue';
export default defineComponent({
    name: 'AdminCourseContentView',
    props: {
        id: String,
        pene: String
    },
    data() {
        return {
            sections: ref([])
        }
    },
    methods: {
        async fetchCourseSections() {
            await findSectionsByCourseId(this.id)
                .then(response => this.sections.value = response.data);
        }
    },
    setup() {
        const currentStep = inject('step');
        currentStep.value = 3;
    },
    mounted() {
        this.fetchCourseSections();
    },
    components: {
        CourseSectionListTable
    }
});
</script>