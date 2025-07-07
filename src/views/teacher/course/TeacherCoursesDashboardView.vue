<template>
    dashboard de cursos
</template>
<script setup>
import { inject } from 'vue';

const currentPath = inject('module');
currentPath.value = 'courses'
</script>