<template>
  <div class="px-4">
    <!-- modal para cambiar contraseña -->
    <n-modal
      v-model:show="showModalPassword"
      :icon="iconWarning"
      :mask-closable="false"
      preset="dialog"
      style="border-radius: 15px"
      title="Recuperar contraseña"
    >
      <n-space vertical size="large">
        <n-p depth="3">Escribe la nueva contraseña del usuario</n-p>
        <n-form>
          <n-form-item label="Contraseña" required>
            <n-input type="password" placeholder="Ingrese la nueva contraseña" />
          </n-form-item>
          <n-button type="info" style="width: 100%; border-radius: 10px"
            >Cambiar contraseña</n-button
          >
        </n-form>
      </n-space>
    </n-modal>

    <!-- cabecera  -->
    <div class="admin-header pt-4 pb-4">
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

    <n-space vertical size="large" style="margin-bottom: 15px">
      <n-grid cols="1 m:7 l:7" item-responsive responsive="screen">
        <n-grid-item span="1 m:3 l:3">
          <n-layout style="text-align: center">
            <p style="font-size: 25px; font-weight: bold">
              Joana Andrea Marquina hernandez
            </p>
            <p style="text-align: center">Departamento: Laboratorio</p>
            <p style="text-align: center">
              Puesto: Quimico de estabilidades y documentacion
            </p>
          </n-layout>
          <br />
          <n-space justify="space-around">
            <n-tag size="large" type="success" round
              >Activo <n-icon :component="CheckFilled"
            /></n-tag>
            <n-tag size="large" round>Empleado</n-tag>
            <n-tag size="large" round>Evaluador</n-tag>
          </n-space>
          <br />
          <n-space vertical>
            <n-button type="info" style="width: 100%; border-radius: 10px"
              >Editar perfil</n-button
            >
            <n-button
              @click="showModalPassword = true"
              type="info"
              style="width: 100%; border-radius: 10px"
              >Actualizar contraseña</n-button
            >
            <n-button
              @click="handleSuspend"
              type="info"
              style="width: 100%; border-radius: 10px"
              >Suspender acceso</n-button
            >
          </n-space>
          <br />
          <n-space
            vertical
            style="border: 1px solid #0d5a79; padding: 10px; border-radius: 10px"
          >
            <n-form-item label="Version del examen:">
              <n-input-group>
                <n-input placeholder="Version del examen" />
              </n-input-group>
              <n-button><n-icon :component="SearchFilled" /></n-button>
            </n-form-item>
            <n-form-item label="Revision:">
              <n-input-group>
                <n-input placeholder="Revision" />
                <n-button><n-icon :component="SearchFilled" /></n-button>
              </n-input-group>
            </n-form-item>
            <n-form-item label="Buscar por rango de fechas:">
              <n-input-group>
                <n-date-picker style="width: 100%" type="daterange" clearable />
                <n-button><n-icon :component="SearchFilled" /></n-button>
              </n-input-group>
            </n-form-item>
            <n-button style="width: 100%" type="info">Borrar filtros</n-button>
          </n-space>
        </n-grid-item>

        <n-grid-item span="1 m:4 l:4" class="styleList">
          <n-space vertical>
            <n-infinite-scroll class="styleScrollInfinite">
              <n-card v-for="exam in data" hoverable :bordered="false" class="styleCard">
                {{ exam.name }}
              </n-card>
            </n-infinite-scroll>
          </n-space>
          <n-space class="stylePagination" justify="center">
            <n-pagination :page-count="8" :page-slot="5" />
          </n-space>
        </n-grid-item>
      </n-grid>
    </n-space>
  </div>
</template>

<script scoped>
import { defineComponent, ref, h } from "vue";
import {
  NBreadcrumb,
  NBreadcrumbItem,
  NIcon,
  NSpace,
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NTag,
  NGrid,
  NGi,
  NGridItem,
  NButton,
  NFormItem,
  NInput,
  NSelect,
  NDatePicker,
  NInputGroup,
  NInfiniteScroll,
  NPagination,
  useDialog,
  useMessage,
  NCard,
  NModal,
  NForm,
  NP,
} from "naive-ui";
import {
  PeopleAltFilled,
  TimelineFilled,
  CheckFilled,
  SearchFilled,
  WarningAmberFilled,
} from "@vicons/material";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
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
    NForm,
    NCard,
    NModal,
    NP,
    NDatePicker,
  },
  setup() {
    const data = [
      { name: "Ensamble de sondas para alimentos prematuros (3009)(3016)" },
      { name: "Ensamble de sondas (3009)(3016)" },
      { name: "MIT-106.02.02.1 Adaptador con aguja Cal. 20X38 o 18X38" },
      { name: "Ensamble de sondas para alimentos prematuros (3009)(3016)" },
      { name: "Ensamble de sondas (3009)(3016)" },
      { name: "MIT-106.02.02.1 Adaptador con aguja Cal. 20X38 o 18X38" },
      { name: "Ensamble de sondas para alimentos prematuros (3009)(3016)" },
      { name: "Ensamble de sondas (3009)(3016)" },
      { name: "MIT-106.02.02.1 Adaptador con aguja Cal. 20X38 o 18X38" },
      { name: "Ensamble de sondas para alimentos prematuros (3009)(3016)" },
      { name: "Ensamble de sondas (3009)(3016)" },
      { name: "MIT-106.02.02.1 Adaptador con aguja Cal. 20X38 o 18X38" },
    ];

    // funcion para retroceder de ruta para el breadcrum
    const router = useRouter();
    function goBack() {
      router.back();
    }

    // funcion para gestionar el estado de cuenta de un empleado,
    // la logica debe cambiar de acuerdo al estado que se encuentre la cuenta del empledado
    const message = useMessage();
    const dialog = useDialog();
    function handleSuspend() {
      dialog.warning({
        title: "Confirmacion",
        content: "¿Esta seguro de suspender el acceso al usuario?",
        positiveText: "Sí",
        negativeText: "Cancelar",
        onPositiveClick: () => {
          message.success("Acceso suspendido");
        },
        onNegativeClick: () => {
          message.error("Acceso no suspendido");
        },
      });
    }

    const showModalPassword = ref(false);
    // renderizado de icono para modal
    const iconWarning = () =>
      h(WarningAmberFilled, { style: "color: #F0A020; font-size: 25px;" });

    return {
      goBack,
      PeopleAltFilled,
      TimelineFilled,
      CheckFilled,
      SearchFilled,
      data,
      handleSuspend,
      showModalPassword,
      iconWarning,
    };
  },
});
</script>

<style>
.stylePagination {
  background-color: #0d5a79;
  padding-top: 5px;
  padding-bottom: 5px;
}

@media (max-width: 425px) {
  .stylePagination {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}

.styleScrollInfinite {
  height: 42rem;
}

@media (max-width: 425px) {
  .styleScrollInfinite {
    height: 30rem;
  }
}

@media (max-width: 425px) {
  .styleList {
    margin-top: 2rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }
}

@media (min-width: 768px) {
  .styleList {
    margin-top: 2rem;
  }
}

@media (min-width: 1024px) {
  .styleList {
    margin-left: 2rem;
    margin-top: 2rem;
  }
}

.styleCard {
  margin-bottom: 10px;
  border: 1px solid #0d5a79;
  border-radius: 10px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 425px) {
  .admin-header {
    padding-top: 15px;
  }
}

.admin-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: #0d5a79;
}

@media (max-width: 425px) {
  .admin-title {
    font-size: 2.6rem;
    text-align: center;
  }
}
</style>
