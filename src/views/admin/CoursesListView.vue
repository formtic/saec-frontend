<template>
    <div class="pr-4 pl-4">
        <div class="admin-header pt-4 pb-4">
            <n-breadcrumb class="admin-breadcumb">
                <n-breadcrumb-item>
                    <n-icon :component="BookFilled" />
                    Cursos
                </n-breadcrumb-item>
            </n-breadcrumb>
            <h1 class="admin-title">Cursos</h1>
        </div>

              <div style="display: flex; gap: 1rem; justify-content: space-between; align-items: center;">
            <n-form-item label="Buscar Empleado" style="width: 100%">
                <n-input v-model="searchQuery" placeholder="Nombre o número del empleado" clearable
                    class="search-input" />
                <n-button color="#0D5A79" class="search-button">
                    <template #icon>
                        <n-icon color="#ffffff">
                            <SearchFilled />
                        </n-icon>
                    </template>
                </n-button>
            </n-form-item>

            <n-button color="#0D5A79" @click="toggleSortOrder"
                style="display: flex; align-items: center; gap: 1rem; border-radius: 8px;">
                <span style="color:white">A-Z</span>
                <n-icon :component="sortAscending ? TrendingUpFilled : TrendingDownFilled" color="#ffffff" size="20" />
            </n-button>
            <n-button color="#0D5A79" @click="navigateToNewCourse">
                <span style="color: white">Nuevo Curso</span>
            </n-button>
        </div>

        <div
            style="width: 100%; padding-top: 1rem; padding-bottom: 1rem; background-color: #0D5A79; margin-bottom: 3rem;" />

        <n-grid cols="1 s:1 m:2 l:3" x-gap="12" y-gap="12" responsive="screen">
            <n-gi v-for="course in paginatedCourses" :key="course.id">
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
        <n-pagination v-model:page="currentPage" :page-count="pageCount" class="pagination" :theme-overrides="paginationTheme" />
    </div>
</template>

<script scoped>
import { defineComponent, ref, computed } from "vue";
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
    NFormItem,
    NInput,
    NButton,
    NGrid,
    NGi,
    NCard,
    NPagination,
} from "naive-ui";

export default defineComponent({
    components: {
        NBreadcrumb,
        NBreadcrumbItem,
        NIcon,
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
    },
    setup() {
        const searchQuery = ref("");
        const sortAscending = ref(true);
        const currentPage = ref(1);
        const pageSize = 6;
        const router = useRouter();

        const toggleSortOrder = () => {
            sortAscending.value = !sortAscending.value;
        };

        const navigateToNewCourse = () => {
            router.push("/admin/courses/new-course");
        };

        const courses = ref([
            { id: 1, name: "MOR-122.1 Gerente de producción. MOR-122.2 Jefe de proyectos" },
            { id: 2, name: "ALM - 105 Movimiento de materia prima y producto terminado" },
            { id: 3, name: "MPC-109.2 Buenas prácticas de fabricación" },
            { id: 4, name: "MPC-109.3 Buenas prácticas de documentación" },
            { id: 5, name: "MOR-122.3 Jefe de producción" },
            { id: 6, name: "MOR-122.4 Gerente de proyectos" },
            { id: 7, name: "ALM - 105.1 Manejo de inventarios" },
            { id: 8, name: "ALM - 105.2 Control de calidad" },
            { id: 9, name: "MPC-109.4 Buenas prácticas de seguridad" },
            { id: 10, name: "MTA-130 Prueba de hermeticidad en dispositivos médicos" },
            { id: 12, name: "MPC-109.5 Buenas prácticas de higiene" },
            { id: 13, name: "Formato PRO - 05 Nota de entrega de producto terminado" },
            { id: 14, name: "MPC - 105.2 Control de cambios" },
            { id: 15, name: "MPF-113 GEN-03 Procedimiento de limpieza para las áreas de manufactura" },
            { id: 16, name: "MIT-016.08.1.2 Kit para conexión y desconexión de fístula (4095, 4093)" },
        ]);

        const filteredCourses = computed(() => {
            let filtered = courses.value;
            if (searchQuery.value) {
                filtered = filtered.filter((course) =>
                    course.name.toLowerCase().includes(searchQuery.value.toLowerCase())
                );
            }

            return filtered.slice().sort((a, b) =>
                sortAscending.value ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
            );
        });

        const pageCount = computed(() =>
            Math.ceil(filteredCourses.value.length / pageSize)
        );

        const paginatedCourses = computed(() => {
            const start = (currentPage.value - 1) * pageSize;
            return filteredCourses.value.slice(start, start + pageSize);
        });

        const paginationTheme = {
            itemColor: '#0D5A79',
            itemColorActive: 'white',
            itemTextColor: 'white',
            itemTextColorActive: '#0D5A79',
            itemTextColorHover: 'white',
            itemColorHover: 'rgba(255,255,255,0.1)',
            borderRadius: '6px',
            itemSize: '32px'
        }
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
            filteredCourses,
            paginatedCourses,
            currentPage,
            pageCount,
            paginationTheme
            
        };
    },
});
</script>

<style scoped>
.container {
    padding: 1rem;
}

.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.admin-title {
    font-size: 3rem;
    font-weight: bold;
    color: #0d5a79;
}

.toolbar {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    flex-wrap: wrap;
}

.toolbar-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 8px;
}



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

.name-code-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

.actions {
    display: flex;
    align-items: flex-start;
}

.pagination {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    background-color: #0d5a79;
    padding: 1rem 0;
}

@media (max-width: 886px) {
    .admin-header {
        justify-content: center;
        text-align: center;
    }

    .admin-breadcrumb {
        display: none;
    }

    .toolbar {
        flex-direction: column;
        align-items: stretch;
    }
}
</style>
