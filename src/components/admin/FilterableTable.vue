<template>
    <n-data-table :columns="columns" :data="data" v-model:checked-row-keys="checkedRowsRef" :row-key="row => row.id" striped />
</template>
<script>
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: 'FilterableTable',
    props: {
        data: Array,
        columns: Array,
    },
    setup(props) {
        const data = ref([]);
        watch(() => props.data, (newData) => {
            data.value = newData;
        }, { immediate: true });
        const columns = props.columns;
        const checkedRowsRef = ref([]);
        return { data, columns, checkedRowsRef };
    }

});
</script>