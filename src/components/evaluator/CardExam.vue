<template>
    <div @click="goToExam" class=" p-2 cursor-pointer border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div class="">
            <p class="">{{ exam.title }}</p>
        </div>
        <div class="flex justify-between text-neutral-600/60">
            <p class="">{{ exam.employee }}</p>
            <p class="">{{ exam.date }}</p>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
defineProps({
    exam:Object
})

const router = useRouter();
function goToExam(){
    router.push({name: 'exam', params: {id: props.id}})
}
</script>