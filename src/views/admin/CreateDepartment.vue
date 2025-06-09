<template>
    <div class="px-4">
        <div class="admin-header pt-4 pb-4 w-full">
            <n-breadcrumb class="admin-breadcrumb">
                <n-breadcrumb-item>
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
                    <n-form-item path="name" label="Nombre del departamento" class="w-md">
                        <n-input placeholder="Departamento 1" @keydown.enter.prevent v-model:value="model.name"/>
                    </n-form-item>
                    <n-button @click="handleValidateButtonClick" type="primary">
                        Guardar
                    </n-button>
                </n-form>
            </n-config-provider>
        </n-flex>
            
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { HomeFilled, AddOutlined } from '@vicons/material';
import { NBreadcrumb, NBreadcrumbItem, NIcon, NConfigProvider, NForm, NFormItem, NInput, NButton } from 'naive-ui';
import themeOverrides from '../../theme/filterInputsTheme.js';
import { create } from '../../service/DepartmentService.js';
function validateName(rule, value) {
    console.log(model.value.name)
    if (!model.value.name || model.value.name.trim() === '') return new Error('El nombre es obligatorio');
    return true;
}

function handleValidateButtonClick(e) {
    e.preventDefault();
    formRef.value?.validate(
        (errors) => {
            if (!errors) {
                const payload = {
                    name: model.value.name
                };
                create(payload);
            }
        }
    );
}

const formRef = ref(null)
const model = ref({
    name: null
})

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