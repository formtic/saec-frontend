<template>
    <div>
        <div class="flex justify-center">
            <p class="md:text-[55px] text-[35px] text-sky-700">Lista de cursos</p>
        </div>
        <div>
            <!-- busquedas y filtros -->
        </div>
        <div class="flex grid mt-5 p-4 justify-items-strech">
            <table class="border-separate border-spacing-2 border border-blue-400 dark:border-gray-500">
                <tbody>
                    <tr>
                        <td class="text-center p-5 border border-gray-300 dark:border-gray-700">
                            <CardCourse/>
                        </td>
                        <td class="text-center p-5 border border-gray-300 dark:border-gray-700">Calidad</td>
                    </tr>
                    <tr>
                        <td class="text-center p-5 border border-gray-300 dark:border-gray-700">Inyeccion</td>
                        <td class="text-center p-5 border border-gray-300 dark:border-gray-700">Almacen</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import CardCourse from '../../components/evaluator/CardCourse.vue';
</script>