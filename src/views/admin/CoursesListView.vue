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
            <n-button @click="navigateToNewCourse" type="primary" style="margin-left: auto;">
                <span>Nuevo Curso</span>
            </n-button>
        </n-flex>

        <div class="w-full pt-4 pb-4 bg-primary-900 mb-4" />

        <n-grid cols="1 s:1 m:2 l:3" x-gap="12" y-gap="12" responsive="screen">
            <n-gi v-for="course in courses" :key="course.id">
                <SimpleCardItem :title="course.name" :colorClass="'bg-cyan-600'"/>
            </n-gi>
        </n-grid>

        <!-- Paginador -->
        <n-pagination v-model:page="currentPage" :page-count="pagesCount" :on-update:page="paginate" class="pagination"/>
    </div>

</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
    BookFilled,
    SearchFilled,
    TrendingUpFilled,
    TrendingDownFilled,
    MoreVertFilled,
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
    NCard,
    NPagination,
    NFlex,
    NConfigProvider
} from "naive-ui";
import SimpleCardItem from "../../components/common/listable/SimpleCardItem.vue";
import themeOverrides from '../../theme/theme.js';
import { filter } from "../../service/courseService.js";
import { filter } from "../../service/courseService.js";
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
        NCard,
        NPagination,
        SearchFilled,
        BookFilled,
        TrendingUpFilled,
        TrendingDownFilled,
        MoreVertFilled,
        NFlex,
        SimpleCardItem
    },
    setup() {
        const searchQuery = ref("");
        const sortAscending = ref(true);
        const currentPage = ref(1);
        const pageSize = 12;
        const pagesCount = ref(1);
        const router = useRouter();

        const toggleSortOrder = () => {
            sortAscending.value = !sortAscending.value;
            findFilterdCourses();
        };

        const paginate = (page) => {
            currentPage.value = page;
            findFilterdCourses();
        }

        const navigateToNewCourse = () => {
            router.push("/admin/courses/new-course");
        };

        const courses = ref([]);

        const findFilterdCourses = async() => {
            await filter(searchQuery.value, currentPage .value-1, pageSize, sortAscending.value ? 'ASC' : 'DESC')
            .then(response => {
                const data = response.data;
                courses.value =  data.content;
                pagesCount.value = data.totalPages;
            });
        }

        const searchByName = () => {
            currentPage.value = 1;
            findFilterdCourses()
        }

        onMounted(() => {
            findFilterdCourses();
        })
        
        return {
            BookFilled,
            SearchFilled,
            TrendingUpFilled,
            TrendingDownFilled,
            MoreVertFilled,
            searchQuery,
            toggleSortOrder,
            sortAscending,
            navigateToNewCourse,
            courses,
            courses,
            currentPage,
            pageSize,
            themeOverrides,
            pagesCount,
            searchByName,
            paginate
        };
    },
});
</script>

<style scoped>
.compact-employee-card {
    padding: 12px;
}

.card-content {
    display: flex;
    justify-content: space-between;
    gap: 12px;
}

.employee-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}


.employee-name {
    font-weight: bold;
    font-size: 1rem;
}

.clamped-text {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3rem;
    max-height: calc(1.3rem * 3);
}
</style>
