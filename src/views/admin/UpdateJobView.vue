<template>
    <div class="px-4">
        <div class="admin-header pt-4 pb-4 w-full">
            <n-breadcrumb class="admin-breadcrumb">
                <n-breadcrumb-item @click="router.push('/admin/jobs')">
                    <n-icon :component="CasesOutlined" />
                    Puestos
                </n-breadcrumb-item>
                <n-breadcrumb-item>
                    {{ job?.name }}
                </n-breadcrumb-item>
            </n-breadcrumb>
            <h1 class="admin-title">Actualizar puesto</h1>
        </div>
        <n-form ref="formRef" :model="model" :rules="rules">
            <n-form-item path="name" label="Nombre del puesto" class="w-md mb-2">
                <n-input placeholder="Puesto" @keydown.enter.prevent v-model:value="model.name"></n-input>
            </n-form-item>
            <n-button @click="handleValidateButtonClick" type="primary">
                Actualizar
            </n-button>
        </n-form>
    </div>
</template>
<script setup>
import { ref, defineProps, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { CasesOutlined, HomeFilled } from '@vicons/material';
import { NBreadcrumb, NBreadcrumbItem, NIcon, NForm, NFormItem, NInput, NButton } from 'naive-ui';
import { findById, update } from '../../service/jobService.js';

function validateName(rule, value) {
    if (!model.value.name || !model.value.name.trim() === '') return new Error('El nombre es obligatorio');
    return true;
}

function handleValidateButtonClick(e) {
    e.preventDefault();
    formRef.value?.validate(
        (errors) => {
            if (!errors) {
                updateJob();
            }
        }
    );
}

async function updateJob() {
    const payload = {
        name: model.value.name
    }
    await update(payload, props.id ?? '').then(response => {
        job.value = response.data;
        setTimeout(() => {
            router.push('/admin/jobs')
        }, 2000);
    });
}

const props = defineProps(['id']);

const formRef = ref(null);
const model = ref({
    name: null
});
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

const job = ref(null);

onMounted(async () => {
    const id = props.id ?? '';
    if (id) {
        await findById(id)
            .then(response => {
                job.value = response.data;
                model.value.name = response.data.name;
            })

    }
});
</script>