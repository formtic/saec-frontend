<template>
  <n-card 
    hoverable 
    embedded 
    @click="goToExam(exam)" 
    class="cursor-pointer" 
    :style="{ cursor: 'pointer' }"
  >
    <template #header>
      <n-text strong>{{ exam.title }}</n-text>
    </template>

    <n-space vertical size="small">
      <n-text depth="3">{{ exam.employee }}</n-text>
      <n-text depth="3">{{ exam.date }}</n-text>
    </n-space>
  </n-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { NCard, NSpace, NText } from 'naive-ui'

defineProps({
  exam: Object
})

const router = useRouter()

function goToExam(exam) {
  console.log(exam.title)
}
</script>
