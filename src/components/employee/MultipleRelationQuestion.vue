<template>
  <n-card :bordered="false" >
    <n-space vertical :size="16" class="customContainer">
      <n-text tag="div" class="question-text">
        6.- Responsabilidades. Relaciona según corresponda
      </n-text>

      <div class="table-container">
        <n-table :bordered="false" :single-line="false" size="small">
          <thead>
            <tr>
              <th>Responsabilidades</th>
              <th v-for="(role, index) in roles" :key="'header-' + index">
                {{ role }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, taskIndex) in tasks" :key="'task-' + taskIndex">
              <td>{{ task }}</td>
              <td v-for="(role, roleIndex) in roles" :key="'role-' + taskIndex + '-' + roleIndex">
                <n-radio-group
                  v-model:value="selectedOptions[taskIndex]"
                  :name="'task-' + taskIndex"
                >
                  <n-radio :value="roleIndex" />
                </n-radio-group>
              </td>
            </tr>
          </tbody>
        </n-table>
      </div>
    </n-space>
  </n-card>
</template>

<script setup>
import { ref } from "vue"
import { NText, NCard, NSpace, NTable, NRadio, NRadioGroup } from "naive-ui"

const roles = ref([
  "Supervisor",
  "Persona de Control de Calidad",
  "Movedor de Materiales",
  "Auxiliar",
  "Personal Operativo"
])

const tasks = ref([
  "Verificar el cumplimiento del procedimiento, realizar los recorridos al proceso y hacer las inspecciones necesarias.",
  "Hacer el despeje de línea limpia, manejar correctamente los solventes, cumplir con las condiciones de vestido y seguridad del área.",
  "Realizar la limpieza semanal de los dosificadores y registrar en PRO-18.",
  "Abastecer los materiales o materia prima a las líneas de producción y vigilar que no existan faltantes de material o subensambles en las estaciones de trabajo.",
  "Recibir las OP y el material proporcionado por el almacén, verificar que el material esté completo, identificado y completo.",
  "Mantener actualizado el pizarrón de productividad y rechazo diariamente, postear al metas de productividad.",
  "Clasificar, registrar y entregar al almacén el rechazo generado por lote de fabricación."
])

// Almacena el índice del coumna seleccionado para cada fila
const selectedOptions = ref(Array(tasks.value.length).fill(null))
</script>

<style scoped>
.customContainer {
  margin: -20px;
}
.table-container {
  width: 100%;
  overflow-x: auto;
}
.question-text {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 16px;
}

.n-table {
  width: 100%;
  min-width: 800px;
}

.n-table th {
  white-space: nowrap;
  text-align: center;
  background-color: #f8f8f8;
  font-weight: bold;
}

.n-table td {
  text-align: center;
  vertical-align: middle;
}

.n-table td:first-child {
  min-width: 300px;
  text-align: left;
}

@media (max-width: 768px) {
  .table-container {
    border: 1px solid #eee;
    border-radius: 4px;
  }

  .n-table {
    min-width: unset;
  }

  .n-table td:first-child {
    min-width: 200px;
  }
}


</style>
