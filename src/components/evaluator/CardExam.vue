<template>
    <div @click="goToExam(exam)" class=" p-2 cursor-pointer border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div class="mb-2">
            <p class="">{{ exam.title }}</p>
        </div>
        <div class="text-neutral-600/60">
            <p class="">{{ exam.employee }}</p>
            <p class="pt-2">{{ exam.date }}</p>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
defineProps({
    exam:Object
})

const router = useRouter();
function goToExam(exam){
    console.log(exam.title);
}
</script>