<template>
    <div style="padding-left: 1rem; padding-right: 1rem;">
        <div class="admin-header">
            <n-breadcrumb class="admin-breadcumb">
                <n-breadcrumb-item>
                    <n-icon :component="BookFilled" />
                    Cursos
                </n-breadcrumb-item>
            </n-breadcrumb>
            <h1 class="admin-title">Cursos</h1>
        </div>
        <div style="display: flex; gap: 1rem; justify-content: space-between; align-items: center;">
            <n-form-item label="Buscar Curso" style="width: 100%">
                <n-input v-model="searchQuery" placeholder="Nombre del curso" clearable class="search-input" />
                <n-button color="#0D5A79" class="search-button">
                    <template #icon>
                        <n-icon color="#ffffff">
                            <SearchFilled />
                        </n-icon>
                    </template>
                </n-button>
            </n-form-item>
            <n-form-item label="Filtrado por departamento" style="width: 100%">
                <n-select placeholder="Departamento" multiple max-tag-count="responsive" :options="departmentOptions" />
            </n-form-item>
            <n-button color="#0D5A79" @click="toggleSortOrder"
                style="display: flex; align-items: center; gap: 1rem; border-radius: 8px;">
                <span style="color:white">A-Z</span>
                <n-icon :component="sortAscending ? TrendingUpFilled : TrendingDownFilled" color="#ffffff" size="20" />
            </n-button>
            <n-button color="#0D5A79" style="border-radius: 8px;" @click="navigateToNewCourse">
                <span style="color: white">Nuevo Curso</span>
            </n-button>
        </div>
    </div>
</template>

<script scoped>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { BookFilled, SearchFilled, TrendingUpFilled, TrendingDownFilled } from "@vicons/material";
import { NBreadcrumb, NBreadcrumbItem, NIcon, NFormItem, NInput, NButton, NSelect } from "naive-ui";

export default defineComponent({
    components: {
        NBreadcrumb,
        NBreadcrumbItem,
        NIcon,
        NFormItem,
        NInput,
        NButton,
        SearchFilled,
        NSelect
    },
    setup() {
        const searchQuery = ref('');
        const router = useRouter();
        const departmentOptions = [
            { label: 'Inyección', value: 'inyección' },
            { label: 'Producción', value: 'produccion' },
            { label: 'Inyección1', value: 'inyección1' },
            { label: 'Producción2', value: 'produccion2' },
            { label: 'Inyección3', value: 'inyección3' },
            { label: 'Producción4', value: 'produccion4' },
        ];

        const sortAscending = ref(true);
        const toggleSortOrder = () => {
            sortAscending.value = !sortAscending.value;
        }

        const navigateToNewCourse = () => {
            router.push('/admin/courses/new-course');
        }
        return {
            BookFilled,
            searchQuery,
            departmentOptions,
            sortAscending,
            toggleSortOrder,
            TrendingDownFilled,
            TrendingUpFilled,
            navigateToNewCourse
        }
    }
})
</script>

<style scoped>
.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.admin-title {
    font-size: 3.5rem;
    font-weight: bold;
    color: #0D5A79;
}

.search-input {
    flex-grow: 1;
}

.search-button {
    padding: 8px 12px;
}

@media(max-width: 886px){
    .admin-header {
        justify-content: center;
    }

    .admin-beadcumb {
        display: none;
    }
}
</style>