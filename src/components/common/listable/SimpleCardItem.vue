<template>
    <div class="card-container border border-solid border-gray-400 rounded-sm overflow-hidden pl-2" :class="colorClass">
        <n-flex class="card-content p-2" vertical justify="center">
            <n-text class="text-lg">
                {{ title }}
            </n-text>
            <n-text class="text-base">
                {{ body }}
            </n-text>
        </n-flex>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title: String,
        body: String,
        colorClass: String
    },
    setup(props) {
        name: 'SimpleItem'
        const title = props.title;
        const body = props.body;
        const colorClass = props.colorClass;
        return {
            title,
            body,
            colorClass
        }
    }
});
</script>

<style scoped>
.card-content{
    height: 100%;
    width: 100%;
    background-color: #fff;
}
.card-container {
    height: 120px;
}
</style>