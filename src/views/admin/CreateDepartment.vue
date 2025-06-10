<template>
    <div class="px-4">
        <div class="admin-header pt-4 pb-4 w-full">
            <n-breadcrumb class="admin-breadcrumb">
                <n-breadcrumb-item @click="router.push('/admin/departments')">
                    <n-icon :component="HomeFilled" />
                    Departamentos
                </n-breadcrumb-item>
                <n-breadcrumb-item>
                    <n-icon :component="AddOutlined" />
                    Nuevo
                </n-breadcrumb-item>
            </n-breadcrumb>
            <h1 class="admin-title">Nuevo departamento</h1>
        </div>
        <n-flex class="w-full items-center align-center justify-center">
            <n-config-provider :theme-overrides="themeOverrides">
                <n-form ref="formRef" :model="model" :rules="rules">
                    <n-form-item path="name" label="Nombre del departamento" class="w-md mb-2">
                        <n-input placeholder="Departamento" @keydown.enter.prevent v-model:value="model.name" />
                    </n-form-item>
                    <n-button @click="handleValidateButtonClick" type="primary" >
                        Guardar
                    </n-button>
                </n-form>
            </n-config-provider>
        </n-flex>

    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { HomeFilled, AddOutlined } from '@vicons/material';
import { NBreadcrumb, NBreadcrumbItem, NIcon, NConfigProvider, NForm, NFormItem, NInput, NButton } from 'naive-ui';
import themeOverrides from '../../theme/filterInputsTheme.js';
import { create } from '../../service/DepartmentService.js';

function validateName(rule, value) {
    if (!model.value.name || model.value.name.trim() === '') return new Error('El nombre es obligatorio');
    return true;
}

function handleValidateButtonClick(e) {
    e.preventDefault();
    formRef.value?.validate(
        (errors) => {
            if (!errors) {
                createNewDepartment();
            }
        }
    );
}

async function createNewDepartment() {
    const payload = {
        name: model.value.name
    };
    await create(payload).then(() => {
        setTimeout(() => {
            router.push('/admin/departments');
        }, 2000);
    });
}

const formRef = ref(null)
const model = ref({
    name: null
})
const router = useRouter();
const rules = {
    name: [
        {
            required: true,
            validator: validateName,
            trigger: ['input', 'blur']
        }
    ]
}


</script>