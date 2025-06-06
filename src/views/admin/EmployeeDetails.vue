<template>
    <div style="padding-left: 1rem; padding-right: 1rem;">
        <div class="admin-header">
            <n-breadcrumb class="admin-breadcumb">
                <n-breadcrumb-item @click="goBack">
                    <n-icon :component="PeopleAltFilled" />
                    Empleados
                </n-breadcrumb-item>
                <n-breadcrumb-item>
                    <n-icon :component="TimelineFilled" />
                    Record histórico
                </n-breadcrumb-item>
            </n-breadcrumb>
            <h1 class="admin-title">Record Histórico</h1>
        </div>

        <n-space vertical size="large" style="margin-bottom: 15px;">
            <n-grid cols="1 m:7 l:7" item-responsive responsive="screen">
                <n-grid-item span="1 m:3 l:3">
                    <n-layout style="text-align: center; ">
                        <p style="font-size: 25px; font-weight: bold;">Joana Andrea Marquina hernandez</p>
                        <p style="text-align: center;">Departamento: Laboratorio</p>
                        <p style="text-align: center;">Puesto: Quimico de estabilidades y documentacion</p>
                    </n-layout>
                    <br/>
                    <n-space justify="space-around">
                        <n-tag size="large" type="success" round>Activo <n-icon :component="CheckFilled"/></n-tag>
                        <n-tag size="large" round>Empleado</n-tag>
                        <n-tag size="large" round>Evaluador</n-tag>
                    </n-space>
                    <br/>
                    <n-space vertical>
                        <n-button type="info" style="width: 100%; border-radius: 10px;">Editar perfil</n-button>
                        <n-button type='info' style="width: 100%; border-radius: 10px;">Actualizar contraseña</n-button>
                        <n-button type="info" style="width: 100%; border-radius: 10px;">Suspender acceso</n-button>
                    </n-space>
                    <br/>
                    <n-space vertical style="border: 1px solid #0D5A79; padding: 10px; border-radius: 10px;">
                        <n-form-item label="Version del examen:">
                            <n-input-group>
                                <n-input placeholder="Version del examen"/>
                            </n-input-group>
                            <n-button><n-icon :component="SearchFilled"/></n-button>
                        </n-form-item>
                        <n-form-item label="Revision:">
                            <n-input-group>
                                <n-input placeholder="Revision"/>
                                <n-button><n-icon :component="SearchFilled"/></n-button>
                            </n-input-group>
                        </n-form-item>
                        <n-form-item label="Buscar por rango de fechas:">
                            <n-input-group>
                                <n-date-picker style="width: 100%;" type="daterange" clearable/>
                                <n-button><n-icon :component="SearchFilled"/></n-button>
                            </n-input-group>
                        </n-form-item>
                        <n-button style="width: 100%;" type="info">Borrar filtros</n-button>
                    </n-space>
                </n-grid-item>

                <n-grid-item span="1 m:4 l:4" style="margin-left: 2rem;">
                    <n-space vertical>
                        <n-infinite-scroll style="height: 42rem">
                            <n-card v-for="exam in data" hoverable :bordered="false" class="styleCard">
                                {{ exam.name }}
                            </n-card>
                        </n-infinite-scroll>
                    </n-space>
                    <n-space style="background-color: #0D5A79; padding-top: 5px; padding-bottom: 5px;" justify="center">
                        <n-pagination :page-count="8"/>
                    </n-space>
                </n-grid-item>
            </n-grid>
        </n-space>

    </div>
</template>

<script scoped>
import {defineComponent} from "vue";
import {NBreadcrumb,NBreadcrumbItem,NIcon,NSpace,NLayout,NLayoutSider,NLayoutContent,NTag,NGrid, NGi, NGridItem, NButton, NFormItem, NInput, NSelect, NDatePicker, NInputGroup, NInfiniteScroll, NPagination} from "naive-ui";
import { PeopleAltFilled,TimelineFilled,CheckFilled, SearchFilled, ExpandMoreFilled} from "@vicons/material";
import {useRouter} from "vue-router";

export default defineComponent({
    components:{
        NBreadcrumb,
        NBreadcrumbItem,
        NIcon,
        NGi,
        NPagination,
        NGridItem,
        NSpace,
        NInputGroup,
        NLayout,
        NLayoutSider,
        NLayoutContent,
        NTag,
        NGrid,
        NInfiniteScroll,
        NButton,
        NFormItem,
        NInput,
        NSelect,
        NDatePicker
    },
    setup(){
        const data=[
            {name:'Ensamble de sondas para alimentos prematuros (3009)(3016)'},
            {name:'Ensamble de sondas (3009)(3016)'},
            {name:'MIT-106.02.02.1 Adaptador con aguja Cal. 20X38 o 18X38'},
            {name:'Ensamble de sondas para alimentos prematuros (3009)(3016)'},
            {name:'Ensamble de sondas (3009)(3016)'},
            {name:'MIT-106.02.02.1 Adaptador con aguja Cal. 20X38 o 18X38'},
            {name:'Ensamble de sondas para alimentos prematuros (3009)(3016)'},
            {name:'Ensamble de sondas (3009)(3016)'},
            {name:'MIT-106.02.02.1 Adaptador con aguja Cal. 20X38 o 18X38'},
            {name:'Ensamble de sondas para alimentos prematuros (3009)(3016)'},
            {name:'Ensamble de sondas (3009)(3016)'},
            {name:'MIT-106.02.02.1 Adaptador con aguja Cal. 20X38 o 18X38'}
        ]
        const router = useRouter();
        function goBack(){
            router.back()
        }
        return{
            goBack,
            PeopleAltFilled,
            TimelineFilled,
            CheckFilled,
            SearchFilled,
            data
        }
    }
})
</script>

<style>
.styleCard{
margin-bottom: 10px;
border:1px solid #0D5A79;
border-radius: 10px;
}

.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-input {
    flex-grow: 1;
}

.admin-title {
    font-size: 3.5rem;
    font-weight: bold;
    color: #0D5A79;
}
</style>