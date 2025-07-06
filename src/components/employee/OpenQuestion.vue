<template>
  <div class="pvc-warnings">
    <p class="question-text">7.- Menciona al menos 3 advertencias del enrrollado de PVC manómetro flexible.</p>
    <div class="textarea-container">
      <n-input
        v-model:value="answer"
        type="textarea"
        placeholder="Escribe tu respuesta aquí..."
        :autosize="{
          minRows: 3,
          maxRows: 5
        }"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NInput } from "naive-ui";

export default defineComponent({
  components: {
    NInput
  },
  setup() {
    const answer = ref("");
    return {
      answer
    };
  }
});
</script>

<style scoped>
.pvc-warnings {
  font-family: Arial, sans-serif;
  padding: 16px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.question-text {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 16px;
}

.textarea-container {
  margin-top: 8px;
}

.n-input {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  transition: all 0.3s;
  padding: 8px;
}

.n-input:focus {
  border-color: #2d8cf0;
  box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
}
</style>