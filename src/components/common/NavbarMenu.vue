<template>
    <ul class="absolute top-full left-0 w-full bg-[#0D5A79] border-t border-white shadow-md z-40">
        <li v-for="item in options" :key="item.key" @click="$emit('select', item.key)"
                class="flex items-centerr px-4 py-3 text-white hover:bg-[#187DAC] transition-all cursor-pointer">
            <component :is="item.icon" class="size-5 mr-2" />
            <span>{{ item.label }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        options: Array,
    },
};
</script>