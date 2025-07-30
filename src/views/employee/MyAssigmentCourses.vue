<template>
    <div class="px-4">
        <div class="admin-header pt-4 pb-4 w-full">
            <n-breadcrumb class="admin-breadcumb">
                <n-breadcrumb-item>
                    <n-icon :component="BookFilled" />
                    Cursos
                </n-breadcrumb-item>
            </n-breadcrumb>
            <h1 class="admin-title">Cursos</h1>
        </div>

        <n-flex class="items-center gap-1">
            <n-form @submit.prevent="searchByName">
                <n-form-item label="Buscar curso" class="w-100">
                    <n-input v-model:value="searchQuery" placeholder="Nombre del curso" />
                    <n-button type="primary" attr-type="submit">
                        <n-icon :component="SearchFilled" size="18" />
                    </n-button>
                </n-form-item>
            </n-form>

            <n-button type="primary" @click="toggleSortOrder" class="m-auto">
                <span>A-Z</span>
                <n-icon :component="sortAscending ? TrendingUpFilled : TrendingDownFilled" size="20" />
            </n-button>
        </n-flex>

        <div class="w-full pt-4 pb-4 bg-primary-900 mb-4" />

        <n-grid cols="1 s:1 m:2 l:3" x-gap="12" y-gap="12" responsive="screen">
            <n-gi v-for="assignation in assignations" :key="assignation.course.id">
                <SimpleCardItem :title="assignation.course.name" :colorClass="'bg-cyan-600'"
                    @click="navigateToCourse(assignation.course.id)" />


            </n-gi>
        </n-grid>

        <n-pagination v-model:page="currentPage" :page-count="pagesCount" :on-update:page="paginate"
            class="pagination" />
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
    BookFilled,
    SearchFilled,
    TrendingUpFilled,
    TrendingDownFilled,
} from "@vicons/material";
import {
    NBreadcrumb,
    NBreadcrumbItem,
    NIcon,
    NForm,
    NFormItem,
    NInput,
    NButton,
    NGrid,
    NGi,
    NPagination,
    NFlex,
} from "naive-ui";
import SimpleCardItem from "../../components/common/listable/SimpleCardItem.vue";
import { filter } from "../../service/courseAssigmentService";
import router from "../../router/main.js";

export default defineComponent({
    components: {
        NBreadcrumb,
        NBreadcrumbItem,
        NIcon,
        NForm,
        NFormItem,
        NInput,
        NButton,
        NGrid,
        NGi,
        NPagination,
        NFlex,
        SearchFilled,
        BookFilled,
        TrendingUpFilled,
        TrendingDownFilled,
        SimpleCardItem,
    },
    setup() {
        const searchQuery = ref("");
        const sortAscending = ref(true);
        const currentPage = ref(1);
        const pageSize = 12;
        const pagesCount = ref(1);
        const assignations = ref([]);

        const toggleSortOrder = () => {
            sortAscending.value = !sortAscending.value;
            findFilteredCourses();
        };

        const paginate = (page) => {
            currentPage.value = page;
            findFilteredCourses();
        };

        const findFilteredCourses = async () => {
            await filter(searchQuery.value, currentPage.value - 1, pageSize, sortAscending.value ? 'ASC' : 'DESC')
                .then(response => {
                    const data = response.data;
                    assignations.value = data.content;
                    console.log(data.content);
                    pagesCount.value = data.totalPages;
                });
        };

        const searchByName = () => {
            currentPage.value = 1;
            findFilteredCourses();
        };


        const router = useRouter();

        const navigateToCourse = (courseId) => {
            router.push(`/employee/courses/course-info/${courseId}`);
        }

        onMounted(() => {
            findFilteredCourses();
        });

        return {
            BookFilled,
            SearchFilled,
            TrendingUpFilled,
            TrendingDownFilled,
            searchQuery,
            toggleSortOrder,
            sortAscending,
            assignations,
            currentPage,
            pageSize,
            pagesCount,
            searchByName,
            paginate,
            router,
            navigateToCourse,
        };
    },
});
</script>