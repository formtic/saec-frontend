<template>
    <div style="padding-left: 1rem; padding-right: 1rem;">
        <!-- cabecera -->
        <div class="admin-header">
            <n-grid cols="1 m:2 l:2" item-responsive responsive="screen">
                <n-grid-item style="display: flex; align-items: center; padding-top: 10px;">
                    <n-breadcrumb>
                        <n-breadcrumb-item>
                            <n-icon :component="PeopleAltFilled" />
                            Empleados
                        </n-breadcrumb-item>
                    </n-breadcrumb>
                </n-grid-item>
                <n-grid-item>
                    <h1 class="admin-title">Empleados</h1>
                </n-grid-item>
            </n-grid>
        </div>

        <!-- filtros de busqueda -->
         <n-space size="large" vertical>
            <n-grid cols="1 m:8 l:8" item-responsive responsive="screen">
                <n-grid-item span="1 m:2 l:2">
                    <n-form-item label="Buscar empleado">
                        <n-input-group>
                            <n-input placeholder="Nombre de empleado" clearable/>
                            <n-button type="info"><n-icon :component="SearchFilled "/></n-button>
                        </n-input-group>
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="1 m:2 l:2">
                    <n-form-item label="Filtro por departamento">
                        <n-input-group>
                            <n-select :options="departmentOptions" placeholder="Departamento"/>
                            <n-button type="info"><n-icon :component="SearchFilled"/></n-button>
                        </n-input-group>
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="1 m:2 l:2">
                    <n-form-item label="Filtro por puestos">
                        <n-input-group>
                            <n-select :options="jobsOptions" placeholder="Puesto de trabajo"/>
                            <n-button type="info"><n-icon :component="SearchFilled"/></n-button>
                        </n-input-group>
                    </n-form-item>
                </n-grid-item>
                <n-grid-item class="styleContentButton" span="1">
                    <n-button class="styleButton"  @click="toggleSortOrder" type="info">
                        <span style="color:white">A-Z</span>
                        <n-icon :component="sortAscending ? TrendingUpFilled : TrendingDownFilled" color="#ffffff" size="20" />
                    </n-button>
                </n-grid-item>
                <n-grid-item span="0 m:1 l:1" class="styleContentButton">
                    <n-button class="styleButton" @click="toggleSortOrder" type="info">
                        <span style="color:white">Nuevo Empleado</span>
                    </n-button>
                </n-grid-item>
            </n-grid>
         </n-space>

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
            <n-form-item label="Filtrado por departamento" style="width: 100%">
                <n-select placeholder="Departamento" multiple max-tag-count="responsive" :options="departmentOptions" />
            </n-form-item>
            <n-form-item label="Filtrado por puestos" style="width: 100%">
                <n-select placeholder="Puesto de trabajo" multiple max-tag-count="responsive" :options="jobsOptions" />
            </n-form-item>
            <n-button color="#0D5A79" @click="toggleSortOrder"
                style="display: flex; align-items: center; gap: 1rem; border-radius: 8px;">
                <span style="color:white">A-Z</span>
                <n-icon :component="sortAscending ? TrendingUpFilled : TrendingDownFilled" color="#ffffff" size="20" />
            </n-button>
            <n-button color="#0D5A79">
                <span style="color: white">Nuevo Empleado</span>
            </n-button>
        </div>

        <!-- lista de contenido -->
        <n-grid cols="2 s:1 m:2 l:2" x-gap="12" y-gap="12">
            <n-gi v-for="employee in paginatedEmployees" :key="employee.id">
                <n-card class="compact-employee-card">
                    <div class="card-content">
                        <div class="employee-info">
                            <div class="name-code-row">
                                <span class="employee-name">{{ employee.name }}</span>
                                <span class="employee-code">Código: {{ employee.code }}</span>
                            </div>
                            <div class="details-row">
                                <span class="department">{{ employee.department }}</span>
                                <span class="position">{{ employee.position }}</span>
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
        <n-pagination v-model:page="currentPage" :page-count="totalPages" :on-update:page="changePage" class="pagination" :theme-overrides="paginationTheme" />
        <n-float-button :bottom="20" :right="20" width="50" height="50" type="primary">
            <n-icon :component="PlusFilled" size="20" />
        </n-float-button>
    </div>
</template>

<script scoped>
import { defineComponent, ref, computed } from "vue";
import { NBreadcrumb, NBreadcrumbItem, NIcon, NForm, NFormItem, NInput, NButton, NSelect, NGrid, NGi, NCard, NPagination, NGridItem, NSpace, NInputGroup, NFloatButton } from "naive-ui";
import { PeopleAltFilled, SearchFilled, TrendingUpFilled, TrendingDownFilled, MoreVertFilled,PlusFilled } from "@vicons/material";

export default defineComponent({
    components: {
        NBreadcrumb,
        NBreadcrumbItem,
        NIcon,
        NForm,
        NGridItem,
        NFormItem,
        NInput,
        NFloatButton,
        NInputGroup,
        NButton,
        SearchFilled,
        NSelect,
        NGrid,
        NGi,
        NCard,
        NPagination,
        NSpace,
    },
    setup() {
        const searchQuery = ref('');
        const sortAscending = ref(true);

        const toggleSortOrder = () => {
            sortAscending.value = !sortAscending.value;
        }
        const departmentOptions = [
            { label: 'Inyección', value: 'inyección' },
            { label: 'Producción', value: 'produccion' },
            { label: 'Inyección1', value: 'inyección1' },
            { label: 'Producción2', value: 'produccion2' },
            { label: 'Inyección3', value: 'inyección3' },
            { label: 'Producción4', value: 'produccion4' },
        ];

        const jobsOptions = [
            { label: 'Opción 1', value: 'Opción 1' },
            { label: 'Opción 2', value: 'Opción 2' },
            { label: 'Opción 3', value: 'Opción 3' },
            { label: 'Opción 4', value: 'Opción 4' },

        ]

        const employees = ref([
            { id: 1, name: 'Marquina Hernández Joana Andrea', code: 623, department: 'Laboratorio', position: 'Químico de Estabilidad' },
            { id: 2, name: 'Carlos Pérez', code: 456, department: 'IT', position: 'Desarrollador' },
            { id: 3, name: 'Ana Gómez', code: 789, department: 'RRHH', position: 'Reclutadora' },
            { id: 4, name: 'Luis Torres', code: 101, department: 'Ventas', position: 'Ejecutivo de cuentas' },
            { id: 5, name: 'Sofía Martínez', code: 202, department: 'Marketing', position: 'Diseñadora gráfica' },
            { id: 6, name: 'Fernando López', code: 303, department: 'Producción', position: 'Ingeniero de calidad' },
            { id: 7, name: 'Elena Ríos', code: 404, department: 'Administración', position: 'Contadora' },
            { id: 8, name: 'Javier Domínguez', code: 505, department: 'Seguridad', position: 'Jefe de seguridad' },
            { id: 9, name: 'Laura Méndez', code: 606, department: 'Compras', position: 'Coordinadora de compras' },
            { id: 10, name: 'Roberto Chávez', code: 707, department: 'Almacén', position: 'Supervisor de inventarios' }
        ])

        const itemsPerPage = 6;
        const currentPage = ref(1);
        const totalPages = computed(() => Math.ceil(employees.value.length / itemsPerPage));
        const paginatedEmployees = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            return employees.value.slice(start, start + itemsPerPage);
        })
        const changePage = (page) => {
            currentPage.value = page;
        }

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
            PeopleAltFilled,
            PlusFilled,
            SearchFilled,
            searchQuery,
            TrendingUpFilled,
            TrendingDownFilled,
            toggleSortOrder,
            sortAscending,
            departmentOptions,
            jobsOptions,
            employees,
            itemsPerPage,
            currentPage,
            totalPages,
            paginatedEmployees,
            changePage,
            MoreVertFilled,
            paginationTheme
        }
    }
})
</script>

<style scoped>
.styleButton{
    border-radius: 5px;
}
@media(max-width:425px){
    .styleButton{
        width: 100%;
        margin: 5px;
    }
}
.styleContentButton{
    display: flex;
    justify-content: center;
    align-items: center;
}
.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-input {
    flex-grow: 1;
}

.search-button {
    padding: 8px 12px;
}

.admin-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: #0D5A79;
  text-align: end;
}

@media (max-width: 425px) {
  .admin-title {
    font-size: 2.6rem;
    text-align: center;
  }
}

@media(max-width:425px){
    .admin-header{
        padding-top: 15px;
    }
}

.compact-employee-card {
    height: auto;
    min-height: unset;
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
    gap: 4px;
}

.name-code-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
}

.employee-name {
    font-weight: bold;
    font-size: 0.95rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
}

.employee-code {
    font-size: 0.85rem;
    color: #778C96;
    white-space: nowrap;
}

.details-row {
    display: flex;
    gap: 12px;
    font-size: 0.85rem;
    color: #555;
}

.department::before {
    content: "Dpto: ";
    font-weight: bold;
}

.position {
    font-style: italic;
}

.actions {
    display: flex;
    align-items: flex-start;
}

.pagination {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    background-color: #0D5A79;
    padding: 1rem 0 1rem 0;
}
</style>