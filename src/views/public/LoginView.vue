<template>
    <div class="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <section class="flex flex-col gap-5 items-start pl-16 pr-3 pt-6 md:pt-14">
            <img :src="logo" class="w-52 h-20" />
            <h1 className="text-3xl">Inicio de sesión</h1>
        </section>
        <section class="hidden items-center justify-center bg-indigo-500 text-white md:flex">
            Texto 2
        </section>
    </div>
</template>

<script>
    import logo from "@/assets/svg/logo.svg";
    import { defineComponent, ref } from "vue";
    
    export default defineComponent({
        setup() {
            return {
                logo
            }
        }
    })
</script>