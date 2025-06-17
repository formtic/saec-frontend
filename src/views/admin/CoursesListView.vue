<template>
    <n-config-provider :theme-overrides="themeOverrides">
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
                    <n-form-item label="Buscar Empleado" class="w-100">
                        <n-input v-model:value="searchQuery" placeholder="Nombre o número del empleado" />
                        <n-button type="primary" @click="searchByName">
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
                    <n-card class="compact-employee-card">
                        <div class="card-content">
                            <div class="employee-info">
                                <div class="name-code-row">
                                    <span class="employee-name clamped-text">{{ course.name }}</span>
                                </div>
                            </div>
                            <div class="actions">
                                <n-button text>
                                    <n-icon size="20" color="#000000">
                                        <MoreVertFilled />
                                    </n-icon>
                                </n-button>
                            </div>
                        </div>
                    </n-card>
                </n-gi>
            </n-grid>

            <!-- Paginador -->
            <n-pagination v-model:page="currentPage" :page-count="pageCount" class="pagination"
            :on-update:page="paginate"
            />
        </div>
    </n-config-provider>

</template>

<script>
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

import themeOverrides from '../../theme/theme.js';
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
        NConfigProvider
    },
    setup() {
        const searchQuery = ref("");
        const sortAscending = ref(true);
        const currentPage = ref(1);
        const pageSize = 12;
        const router = useRouter();

        const toggleSortOrder = () => {
            sortAscending.value = !sortAscending.value;
            findCoursesByFilter();
        };

        const paginate = (page) => {
            currentPage.value = page;
            findCoursesByFilter();
        };

        const searchByName = () => {
            currentPage.value = 1;
            findCoursesByFilter();
        }


        const navigateToNewCourse = () => {
            router.push("/admin/courses/new-course");
        };

        const courses = ref([]);

        const pageCount = ref(1);

        const findCoursesByFilter = async() => {
            await filter(searchQuery.value, currentPage.value -1, pageSize, sortAscending.value ? 'ASC' : 'DESC')
            .then(response => {
                const data = response.data;
                courses.value = data.content;
                pageCount.value = data.totalPages;
            });
        }

        onMounted(() => {
            findCoursesByFilter();
        });

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
            currentPage,
            pageCount,
            themeOverrides,
            paginate,
            searchByName

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
