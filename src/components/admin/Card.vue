<template>
    <div class="border border-gray-200 flex flex-col items-center justify-center w-full p-2 rounded-md">
        <div class="flex gap-2 items-center">
            <component :is="icon" class="size-6 text-gray-900" />
            <p class="text-gray-900 text-xl">{{ title }} </p>
        </div>
        <p class="text-[#0D5A79] text-2xl font-bold">{{ count }}</p>
    </div>
</template>

<script setup>
    defineProps({
        icon: {
            type: [Object, String],
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        count: {
            type: [Number, String],
            required: true,
        },
    });
</script>