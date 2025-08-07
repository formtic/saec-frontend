<template>
    Panel general
</template>
<script setup>
import { DashboardFilled } from '@vicons/material';
import { inject } from 'vue';

const breadCrumbItems = inject('breadcrumbItems');
const pageTitle = inject('pageTitle');
pageTitle.value = 'Panel general'
breadCrumbItems.value = [{
    icon: DashboardFilled,
    label: 'Panel general',
    path: '/'
}];
</script>