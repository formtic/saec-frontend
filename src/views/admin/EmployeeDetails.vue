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

        <n-space>
            <n-grid has-sider>
                <n-layout>
                    <n-layout><p>Joana Andrea Marquina Hernandez</p></n-layout>
                    <n-layout><p>Departamento: Laboratorio</p><p>Puesto: Químico de estabilidades y documentación</p></n-layout>
                    <n-layout style="display:flex; justify-content:space-between;">
                        <n-tag round type="success" size="large">Activo <n-icon :component="CheckFilled"/></n-tag>
                        <n-tag round size="large">Empleado</n-tag>
                        <n-tag round size="large">Evaluador</n-tag>
                    </n-layout>
                </n-layout>
                <n-layout>
                hola
                </n-layout>
            </n-grid>
        </n-space>

    </div>
</template>

<script scoped>
import {defineComponent} from "vue";
import {NBreadcrumb,NBreadcrumbItem,NIcon,NSpace,NLayout,NLayoutSider,NLayoutContent,NTag,NGrid} from "naive-ui";
import { PeopleAltFilled,TimelineFilled,CheckFilled } from "@vicons/material";
import {useRouter} from "vue-router";

export default defineComponent({
    components:{
        NBreadcrumb,
        NBreadcrumbItem,
        NIcon,
        NSpace,
        NLayout,
        NLayoutSider,
        NLayoutContent,
        NTag,
        NGrid,
    },
    setup(){
        const router = useRouter();
        function goBack(){
            router.back()
        }
        return{
            goBack,
            PeopleAltFilled,
            TimelineFilled,
            CheckFilled,
        }
    }
})
</script>

<style>
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
}
</style>