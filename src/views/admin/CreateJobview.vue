<template>
    <div class="px-4">
        <div class="admin-header pt-4 pb-4 w-full">
            <n-breadcrumb class="admin-breadcrumb">
                <n-breadcrumb-item @click="router.push('/admin/jobs')">
                    <n-icon :component="CasesOutlined" />
                    Puestos
                </n-breadcrumb-item>
                <n-breadcrumb-item>
                    <n-icon :component="AddOutlined" />
                    Nuevo
                </n-breadcrumb-item>
            </n-breadcrumb>
            <h1 class="admin-title">Nuevo Puesto</h1>
        </div>
        <n-form ref="formRef" :model="model" :rules="rules">
            <n-form-item path="name" label="Nombre del puesto" class="w-md mb-2">
                <n-input placeholder="Puesto" @keydown.enter.prevent v-model:value="model.name" />
            </n-form-item>
            <n-button @click="handleValidateButtonClick" type="primary">
                Guardar
            </n-button>
        </n-form>

    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AddOutlined, CasesOutlined } from '@vicons/material';
import { NBreadcrumb, NBreadcrumbItem, NIcon, NConfigProvider, NForm, NFormItem, NInput, NButton } from 'naive-ui';
import { create } from '../../service/jobService.js';

function validateName(rule, value) {
    if (!model.value.name || model.value.name.trim() === '') return new Error('El nombre es obligatorio');
    return true;
}

function handleValidateButtonClick(e) {
    e.preventDefault();
    formRef.value?.validate(
        (errors) => {
            if (!errors) {
                createNewJob();
            }
        }
    );
}

async function createNewJob() {
    const payload = {
        name: model.value.name
    };
    await create(payload).then(() => {
        setTimeout(() => {
            router.push('/admin/jobs');
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