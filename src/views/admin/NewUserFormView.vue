<template>
    <div class="px-4">
        <div class="admin-header pt-4 pb-4 w-full">
            <n-breadcrumb class="admin-breadcrumb">
                <n-breadcrumb-item @click="router.push('/admin/users')">
                    <n-icon :component="PeopleFilled" />
                    Usuarios
                </n-breadcrumb-item>
                <n-breadcrumb-item>
                    <n-icon :component="PersonAddFilled" />
                    Nuevo usuario
                </n-breadcrumb-item>
            </n-breadcrumb>
            <h1 class="admin-title">Nuevo usuario</h1>
        </div>
        <div>
            <h2 class="text-2xl font-semibold text-primary-700 mb-1">Crear usuario</h2>
            <div class="flex items-center">
                <n-icon :component="InfoOutlined" color="#187dac" class="me-1" />
                <p class="text-sm">Agregue la información del usuario</p>
            </div>
        </div>
        <n-form ref="formRef" class="mt-6" :rules="rules" :model="model">
            <n-grid cols="6" x-gap="16" y-gap="10" item-responsive>
                <n-grid-item span="6 600:3 1200:2">
                    <n-form-item label="Rol" path="role">
                        <n-select :options="roles" placeholder="Rol del usuario" v-model:value="model.role" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="6 600:3 1200:2">
                    <n-form-item label="Nombre completo" path="name">
                        <n-input placeholder="Nombre y apellidos del usuario" v-model:value="model.name" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="6 600:2" v-if="model.role === 'EMPLOYEE'">
                    <n-form-item label="Código" path="employeeNumber">
                        <n-input placeholder="Número de empleado" v-model:value="model.employeeNumber" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="6 600:2 1200:2">
                    <n-form-item label="Correo electrónico" path="email">
                        <n-input placeholder="user@example.com" v-model:value="model.email" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="6 600:2">
                    <n-form-item label="Nombre de usuario" path="username">
                        <n-input placeholder="Nombre de usuario" v-model:value="model.username" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item :span="model.role === 'EMPLOYEE' ? '0 1200:2' : '0 600:2 1200:0'" />
                <n-grid-item span="6 600:2">
                    <n-form-item label="Contraseña" path="password">
                        <n-input placeholder="*******" type="password" show-password-on="click"
                            v-model:value="model.password" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="6 600:2">
                    <n-form-item label="Confirmar contraseña" path="confirmPassword">
                        <n-input placeholder="*******" type="password" show-password-on="click"
                            v-model:value="model.confirmPassword" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="0 600:2" />
                <n-grid-item span="6 600:2" v-if="model.role === 'EMPLOYEE'">
                    <n-form-item label="Departamentos" path="employeeDepartments">
                        <n-select placeholder="Departamentos del empleado" :options="departments" label-field="name"
                            value-field="id" filterable multiple clearable v-model:value="model.employeeDepartments" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item span="6 600:2" v-if="model.role === 'EMPLOYEE'">
                    <n-form-item label="Puestos" path="employeeJobs">
                        <n-select placeholder="Puestos del empleado" :options="jobs" label-field="name" value-field="id"
                            filterable multiple clearable v-model:value="model.employeeJobs" />
                    </n-form-item>
                </n-grid-item>
            </n-grid>
        </n-form>
        <div class="w-1/2 mx-auto" v-if="model.role === 'TEACHER'">
            <n-upload :max="1" directory-dnd>
                <n-upload-dragger>
                    <div style="margin-bottom: 12px">
                        <n-icon size="48" :depth="3">
                            <ArchiveOutline />
                        </n-icon>
                    </div>
                    <n-text style="font-size: 16px">
                        Haga click o arrastre el archivo en esta area
                    </n-text>
                    <n-p depth="3" style="margin: 8px 0 0 0">
                        Solo imagenes JPG
                    </n-p>
                </n-upload-dragger>
            </n-upload>
        </div>
        <div class="w-full flex justify-center mt-8">
            <n-button type="primary" @click="valdiateForm">
                Registrar usuario
            </n-button>
        </div>
    </div>
</template>
<script setup>
import { InfoOutlined, PeopleFilled, PersonAddFilled } from '@vicons/material';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { findAllDepartments } from '../../service/DepartmentService';
import { findAllJobs } from '../../service/jobService';
import { ArchiveOutline } from '@vicons/ionicons5';
import { createEmployee } from '../../service/employeeService';
import { createTeacher } from '../../service/teacherService';

const router = useRouter();
const departments = ref([]);
const jobs = ref([]);
//Formulario
const formRef = ref(null);
const roles = [{ label: 'Empleado', value: 'EMPLOYEE' }, { label: 'Evaluador', value: 'TEACHER' }];
const model = ref(
    {
        name: '',
        role: 'EMPLOYEE',
        email: '',
        employeeNumber: '',
        username: '',
        password: '',
        confirmPassword: '',
        employeeDepartments: [],
        employeeJobs: [],
    },
);

const validateName = (rule, value) => {
    if (!value || value.trim() === '') {
        return new Error('El nombre es obligatorio');
    }
    if (rule.size && rule.size < value.length) {
        return new Error(`Máximo ${rule.size} caracteres`);
    }
    if (!(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(value))) {
        return new Error('El nombre debe contener solo letras del alfabeto')
    }
    return true;
}

const validateEmail = (rule, value) => {
    if (!value || value.trim() === '') {
        return new Error('El email es requerido')
    }
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))) {
        return new Error('Formato de email inválido');
    }
    return true;
}

const validateEmployeeNumber = (rule, value) => {
    if (!value || value.trim() === '') {
        return new Error('El número de empleado es obligatorio')
    }

    if (value.length > 15) {
        return new Error('El número de empleado es demasiado largo')
    }

    if (!(/^[A-Za-z0-9]+$/.test(value))) {
        return new Error('Número de empleado no válido')
    }
}

const validateUsername = (rule, value) => {
    if (!value || value.trim() === '') {
        return new Error('El nombre de usuario es obligatorio');
    }
    if (value.length < 6 || value.length > 24) {
        return new Error('El nombre de usuario debe tener entre 6 y 24 caracteres');
    }
    return true;
}

const validatePassword = (r, value) => {
    if (!value || value.trim() === '') {
        return new Error('La contraseña es obligatoria');
    }
    if (value.length < 8 || value.length > 16) {
        return new Error('La contraseña debe tener entre 8 caracteres y 16 caracteres');
    }
    return true;
}

const validateConfirmPassword = (r, value) => {
    if (model.value.password && value !== model.value.password) {
        console.log(value)
        return new Error('Las contraseñas no son iguales');
    }
    return true;
}



const rules = {
    role: {
        required: true,
        trigger: ['blur', 'input'],
        message: 'El rol del usuario es requerido'
    },
    name: {
        required: true,
        validator: validateName,
        trigger: ['blur', 'input'],
        size: 35,
    },
    email: {
        required: true,
        validator: validateEmail,
        trigger: ['blur', 'input']
    },
    username: {
        required: true,
        validator: validateUsername,
        trigger: ['blur', 'input']
    },
    password: {
        required: true,
        validator: validatePassword,
        trigger: ['blur', 'input']
    },
    confirmPassword: {
        required: true,
        validator: validateConfirmPassword,
        trigger: ['blur', 'input']
    },
    employeeDepartments: {
        required: true,
        trigger: ['blur', 'change'],
        validator(rule, value) {
            if (value.length === 0) {
                return new Error('Agregue el menos un departamento');
            }
            return true;
        }
    },
    employeeJobs: {
        required: true,
        trigger: ['blur', 'change'],
        validator(rule, value) {
            if (value.length === 0) {
                return new Error('Agregue al menos un puesto');
            }
            return true;
        }
    },
    employeeNumber: {
        required: true,
        trigger: ['blur', 'input'],
        validator: validateEmployeeNumber
    }
};

const valdiateForm = () => {
    formRef.value?.validate((errors) => {
        if (!errors) {
            const data = {
                username: model.value.username,
                fullName: model.value.name,
                password: model.value.password,
                email: model.value.email,
                employeeNumber: model.value?.employeeNumber,
                departmentsId: model.value?.employeeDepartments,
                jobsId: model.value?.employeeJobs
            }
            saveUser(data);            
        }
    });
}

const fetchDepartments = async () => {
    await findAllDepartments()
        .then(response => {
            departments.value = response.data;
        });
}

const fetchJobs = async () => {
    await findAllJobs()
        .then(response => {
            jobs.value = response.data;
        });
}

const saveUser = async (data) => {
    await ({
        EMPLOYEE: () => createEmployee(data),
        TEACHER: () => createTeacher(data)
    })[model.value.role]?.();
}

onMounted(() => {
    fetchDepartments();
    fetchJobs();
})
</script>