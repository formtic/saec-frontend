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
  <n-form>
    <n-form-item label="Rol:" required>
      <n-select :options="rols" />
    </n-form-item>

    <!-- Nombre y Apellido -->
    <n-grid responsive="screen" item-responsive :x-gap="8">
      <n-form-item-gi span="24 m:12 l:12" label="Nombre(s):" required>
        <n-input placeholder="Ej. Joana Andrea" />
      </n-form-item-gi>
      <n-form-item-gi span="24 m:12 l:12" label="Apellido(s):" required>
        <n-input placeholder="Ej. Marquina Hernandez" />
      </n-form-item-gi>
    </n-grid>

    <!-- Departamento y Puesto -->
    <n-grid responsive="screen" item-responsive :x-gap="8">
      <n-form-item-gi span="24 m:12 l:12" label="Departamento:" required>
        <n-select :options="departmenst" placeholder="Departamento" />
      </n-form-item-gi>
      <n-form-item-gi span="24 m:12 l:12" label="Puesto:" required>
        <n-select :options="jobs" placeholder="Puesto" />
      </n-form-item-gi>
    </n-grid>

    <!-- Código y Correo -->
    <n-grid responsive="screen" item-responsive :x-gap="8">
      <n-form-item-gi span="24 m:12 l:12" label="Código de usuario:" required>
        <n-input placeholder="Código de usuario" />
      </n-form-item-gi>
      <n-form-item-gi span="24 m:12 l:12" label="Correo electrónico:" required>
        <n-input placeholder="Correo electrónico" />
      </n-form-item-gi>
    </n-grid>

    <!-- Firma -->
    <n-form-item label="Firma del empleado">
      <n-upload :max="1">
        <n-upload-dragger>
          <div>
            <n-icon :size="48" :depth="3">
              <ArchiveFilled />
            </n-icon>
          </div>
          <div>
            <p style="font-size: 16px">
              Arrastra y suelta el archivo o
              <span style="color: #1D8EC6;">haz clic para seleccionar</span>
            </p>
            <n-p depth="3">Máximo 5MB</n-p>
          </div>
        </n-upload-dragger>
      </n-upload>
    </n-form-item>

    <!-- Botón -->
    <n-space style="display: flex; justify-content: center; margin-top: 1rem;">
      <n-button type="success">Registrar empleado</n-button>
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
  NButton
} from "naive-ui";
import {
  PeopleAltFilled,
  PersonAddAlt1Filled,
  ArchiveFilled,
} from "@vicons/material";
import { defineComponent } from "vue";
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
    return {
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
