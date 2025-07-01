<template>
  <div class="px-4">
    <!-- CABECERA -->
    <div class="admin-header pt-4 pb-4">
      <n-breadcrumb class="admin-breadcumb">
        <n-breadcrumb-item @click="goBack">
          <n-icon :component="PeopleAltFilled" />
          Empleados
        </n-breadcrumb-item>
        <n-breadcrumb-item>
          <n-icon :component="PersonAddAlt1Filled" />
          Nuevo empleado
        </n-breadcrumb-item>
      </n-breadcrumb>
      <h1 class="admin-title">Nuevo empleado</h1>
    </div>

    <n-space vertical size="large" style="margin-bottom: 15px">
      <n-form ref="formRef" :model="formValue" :rules="rules">
        <n-form-item label="Rol:" path="role" required>
          <n-select
            placeholder="Seleccione un rol"
            v-model:value="formValue.role"
            :options="rols"
          />
        </n-form-item>

        <!-- Nombre y Apellido -->
        <n-grid responsive="screen" item-responsive :x-gap="8">
          <n-form-item-gi span="24 m:12 l:12" path="name" label="Nombre(s):" required>
            <n-input v-model:value="formValue.name" placeholder="Ej. Joana Andrea" />
          </n-form-item-gi>
          <n-form-item-gi
            span="24 m:12 l:12"
            path="lastname"
            label="Apellido(s):"
            required
          >
            <n-input
              v-model:value="formValue.lastname"
              placeholder="Ej. Marquina Hernandez"
            />
          </n-form-item-gi>
        </n-grid>

        <!-- Departamento y Puesto -->
        <n-grid responsive="screen" item-responsive :x-gap="8">
          <n-form-item-gi
            span="24 m:12 l:12"
            path="departments"
            label="Departamento:"
            required
          >
            <n-select
              v-model:value="formValue.departments"
              multiple
              :options="departmenst"
              placeholder="Departamento"
            />
          </n-form-item-gi>
          <n-form-item-gi span="24 m:12 l:12" path="jobs" label="Puesto:" required>
            <n-select
              v-model:value="formValue.jobs"
              multiple
              :options="jobs"
              placeholder="Puesto"
            />
          </n-form-item-gi>
        </n-grid>

        <!-- Código y Correo -->
        <n-grid responsive="screen" item-responsive :x-gap="8">
          <n-form-item-gi
            path="employeeNumber"
            span="24 m:12 l:12"
            label="Código de usuario:"
            required
          >
            <n-input
              v-model:value="formValue.employeeNumber"
              placeholder="Código de usuario"
            />
          </n-form-item-gi>
          <n-form-item-gi
            path="email"
            span="24 m:12 l:12"
            label="Correo electrónico:"
            required
          >
            <n-input v-model:value="formValue.email" placeholder="Correo electrónico" />
          </n-form-item-gi>
        </n-grid>

        <!-- Firma -->
        <n-form-item path="sign" label="Firma del empleado">
          <n-upload
            accept=".png, .jpg, .jpeg"
            :max="1"
            ref="upload"
            :on-change="handleChange"
          >
            <n-upload-dragger>
              <div>
                <n-icon :size="48" :depth="3">
                  <ArchiveFilled />
                </n-icon>
              </div>
              <div>
                <p style="font-size: 16px">
                  Arrastra y suelta el archivo o
                  <span style="color: #1d8ec6">haz clic para seleccionar</span>
                </p>
                <n-p depth="3">Máximo 5MB</n-p>
              </div>
            </n-upload-dragger>
          </n-upload>
        </n-form-item>

        <!-- Botón -->
        <n-space style="display: flex; justify-content: center; margin-top: 1rem">
          <n-button @click="handleForm" type="success">Registrar empleado</n-button>
        </n-space>
      </n-form>
    </n-space>
  </div>
</template>

<script>
import {
  NGrid,
  NSpace,
  NForm,
  NBreadcrumb,
  NBreadcrumbItem,
  NIcon,
  NFormItemGi,
  NInput,
  NInputGroup,
  NFormItem,
  NSelect,
  NUpload,
  NUploadDragger,
  NText,
  NP,
  NButton,
} from "naive-ui";
import { PeopleAltFilled, PersonAddAlt1Filled, ArchiveFilled } from "@vicons/material";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    NSpace,
    NP,
    NText,
    NUpload,
    NUploadDragger,
    NSelect,
    NForm,
    NFormItem,
    NGrid,
    NInput,
    NFormItemGi,
    NBreadcrumb,
    NBreadcrumbItem,
    NInputGroup,
    NIcon,
    NButton,
    ArchiveFilled,
  },
  setup() {
    const formRef = ref(null);
    const rols = [
      { label: "Administrador", value: "Administrador" },
      { label: "Evaluador", value: "Evaluador" },
      { label: "Empleado", value: "Empleado" },
    ];
    const departmenst = [
      { label: "Departamento 1", value: "Departamento 1" },
      { label: "Departamento 2", value: "Departamento 2" },
      { label: "Departamento 3", value: "Departamento 3" },
    ];
    const jobs = [
      { label: "Puesto 1", value: "Puesto 1" },
      { label: "Puesto 2", value: "Puesto 2" },
      { label: "Puesto 3", value: "Puesto 3" },
    ];
    const router = useRouter();
    function goBack() {
      router.back();
    }
    function handleChange({ file }) {
      formValue.value.sign = file.file;
      formRef.value?.validate();
    }
    function handleForm(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          console.log("✅ 🤑Datos válidos", formValue.value);
        } else {
          console.log("❌ 🤬Errores en el formulario", errors);
        }
      });
    }
    const formValue = ref({
      role: null,
      name: "",
      lastname: "",
      departments: [],
      jobs: [],
      employeeNumber: "",
      email: "",
      sign: null,
    });
    const rules = {
      role: {
        required: true,
        message: "Seleccione un rol",
        trigger: "change",
      },
      name: {
        required: true,
        message: "Por favor ingrese un nombre",
        trigger: "blur",
      },
      lastname: {
        required: true,
        message: "Porfavor ingrese los apellidos",
        trigger: "blur",
      },
      departments: {
        required: true,
        trigger: "change",
        validator(rule, value) {
          if (!value || value.length === 0) {
            return new Error("Seleccione al menos un departamento");
          }
          return true;
        },
      },
      jobs: {
        required: true,
        trigger: "change",
        validator(rule, value) {
          if (!value || value.length === 0) {
            return new Error("Seleccione al menos un puesto");
          }
          return true;
        },
      },
      employeeNumber: {
        required: true,
        message: "Ingrese un número de empleado",
        trigger: "blur",
      },
      email: {
        required: true,
        message: "Ingrese un correo válido",
        trigger: ["blur", "input"],
      },
      sign: {
        required: true,
        validator(rule, value) {
          if (!value || !(value instanceof File)) {
            return new Error("Debe subir un archivo de firma válido");
          }
          if (value.size > 5 * 1024 * 1024) {
            return new Error("El archivo supera los 5MB");
          }
          return true;
        },
        trigger: "change",
      },
    };

    return {
      handleChange,
      handleForm,
      formRef,
      formValue,
      rules,
      PeopleAltFilled,
      PersonAddAlt1Filled,
      ArchiveFilled,
      goBack,
      rols,
      departmenst,
      jobs,
    };
  },
});
</script>

<style>
.reviewer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reviewer-breadcrumb {
  display: flex;
}

.reviewer-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: #0d5a79;
}
</style>
