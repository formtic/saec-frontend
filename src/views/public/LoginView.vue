<template>
  <n-grid :cols="2" class="responsive-grid">
    <n-gi>
      <div class="simple-container">
        <n-image width="200" height="90" :src="logo" />
        <n-h1>Inicio de Sesión</n-h1>
        <n-form
          ref="formRef"
          :model="modelRef"
          :rules="rules"
          class="form-login-container"
          @submit.prevent="handleSubmit"
        >
          <n-form-item path="username" label="Clave de acceso" required>
            <n-input
              v-model:value="modelRef.username"
              type="text"
              @keydown.enter.prevent
              placeholder="Ingresa tu clave de acceso"
              style="width: 100%"
            />
          </n-form-item>
          <n-form-item path="password" label="Contraseña" required>
            <n-input
              v-model:value="modelRef.password"
              type="password"
              @keydown.enter.prevent
              placeholder="Ingresa tu contraseña"
              style="width: 100%"
              show-password-on="click"
            />
          </n-form-item>
          <n-button
            :disabled="!modelRef.username || !modelRef.password || loading"
            style="width: 100%"
            color="#0D5A79"
            @click="handleSubmit"
          >
            <template v-if="loading">
              <n-spin size="small" />
            </template>
            <template v-else> Iniciar Sesión </template>
          </n-button>
        </n-form>
        <div class="recovery-password">
          <n-p pMargin="0">¿Olvidaste tu contraseña?</n-p>
          <n-button text color="#0D5A79" @click="showModal = true"
            >Recuperar Cuenta</n-button
          >
        </div>
      </div>
    </n-gi>
    <n-gi class="hidden-mobile">
      <div class="image-container simple-container bg-container" />
    </n-gi>
  </n-grid>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="Recuperar contraseña"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-p style="margin-top: 0"
        >Solicita a un administrador tu contraseña de activación.</n-p
      >
      <n-form ref="modalFormRef" :model="modalModelRef" :rules="modalRules">
        <n-form-item path="accessKey" label="Clave de acceso" required>
          <n-input
            v-model:value="modalModelRef.accessKey"
            type="text"
            style="width: 100%"
            placeholder="Ingresa tu clave de acceso"
          />
        </n-form-item>
        <n-button
          style="width: 100%"
          color="#0D5A79"
          @click="handleModalSubmit"
        >
          <template v-if="loading">
            <n-spin size="small" />
          </template>
          <template v-else>Solicitar</template>
        </n-button>
      </n-form>
    </n-card>
  </n-modal>
</template>

<script>
import {
  NGrid,
  NGi,
  NImage,
  NH1,
  NForm,
  NFormItem,
  NInput,
  NButton,
  NSpin,
  NP,
  NModal,
  NCard,
} from "naive-ui";
import { defineComponent, ref } from "vue";
import logo from "../../assets/svg/logo.svg";
import { useRouter } from "vue-router";
import { login } from "../../service/authService";

export default defineComponent({
  components: {
    NGrid,
    NGi,
    NImage,
    NH1,
    NForm,
    NFormItem,
    NInput,
    NButton,
    NSpin,
    NP,
    NModal,
    NCard,
  },
  setup() {
    const formRef = ref(null);
    const modalFormRef = ref(null);
    const modelRef = ref({
      username: "",
      password: "",
    });
    const modalModelRef = ref({
      accessKey: "",
    });
    const loading = ref(false);
    const showModal = ref(false);
    const rules = {
      username: [
        {
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error("Campo requerido.");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
      password: [
        {
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error("Campo requerido.");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
    };

    const modalRules = {
      accessKey: [
        {
          required: true,
          message: "Campo requerido.",
          trigger: ["input", "blur"],
        },
      ],
    };

    const handleSubmit = () => {
      formRef.value.validate((errors) => {
        if (!errors) {
          loading.value = true;
          signIn();
        }
      });
    };

    const signIn = async() => {
      const payload = {
        username: modelRef.value.username,
        password: modelRef.value.password
      }
      await login(payload).finally(() => {
        loading.value = false;
      });
    }

    const handleModalSubmit = () => {
      modalFormRef.value.validate((errors) => {
        if (!errors) {
          console.log("Solicitud enviada");
          showModal.value = false;
        }
      });
    };
    const router = useRouter();

    return {
      logo,
      formRef,
      modalFormRef,
      rules,
      modalRules,
      modelRef,
      modalModelRef,
      loading,
      showModal,
      handleSubmit,
      handleModalSubmit,
    };
  },
});
</script>

<style scoped>
.image-container {
  background-image: url("../../assets/images/imageContainer.png");
}

.simple-container {
  min-height: 100vh;
  padding: 5rem 1rem 0 6rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1.2rem;
}
.recovery-password {
  display: flex;
  width: calc(100% - 5rem);
  padding: 1rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: calc(100% - 5rem);
}

@media (max-width: 768px) {
  .hidden-mobile {
    display: none;
  }
  .responsive-grid {
    grid-template-columns: 1fr !important;
  }

  .simple-container {
    align-items: center;
    padding: 2rem 1rem;
  }
  .recovery-password {
    padding: 1rem 0 1rem 0;
  }
}

.form-login-container {
  width: calc(100% - 3rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.n-p:first-child {
  margin-top: 1rem;
}
</style>