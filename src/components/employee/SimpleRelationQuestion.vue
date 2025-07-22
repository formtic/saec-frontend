<template>
    <div class="time-matching">
        <n-text tag="p" strong class="question-text">
            {{ question.title }}
        </n-text>

        <div class="content-wrapper">
            <div class="image-container">
                <n-image class="style-image" width="400" src="../../../public/example_image.jpg" alt="Imagen"
                    preview-enable />
            </div>

            <div class="items-container">
                <div v-for="(concept, index) in question.concepts" :key="index" class="item-row">
                    <n-text class="time-display">
                        {{ concept.concept }}
                    </n-text>
                    <n-input 
                        v-model:value="userAnswers[concept.correctOrder]" 
                        type="text" 
                        placeholder="Escribe la definición correspondiente..."
                        clearable 
                        class="full-width-input" 
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { NInput, NText, NImage } from "naive-ui"

const props = defineProps({
    question: {
        type: Object,
        required: true
    }
})

// Inicializar respuestas del usuario
const userAnswers = ref(Array(props.question.concepts.length).fill(''))

// Opcional: Si necesitas emitir las respuestas al componente padre
// const emit = defineEmits(['update:answers'])

// watch(userAnswers, (newVal) => {
//     emit('update:answers', newVal)
// }, { deep: true })
</script>

<style scoped>
.time-matching {
    padding: 1rem;
    margin: 0 auto;
}

.question-text {
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 16px;
    text-align: left;
}

.content-wrapper {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
}

.image-container {
    display: flex;
    justify-content: center;
    flex: 0 0 auto;
}

.style-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.items-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 250px;
}

.item-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
}

.time-display {
    flex: 0 0 200px;
    font-weight: 500;
}

.full-width-input {
    flex: 1;
    min-width: 200px;
}

@media (min-width: 650px) and (max-width: 1099px) {
    .content-wrapper {
        flex-direction: column;
        align-items: center;
    }

    .image-container {
        margin-bottom: 1.5rem;
        width: 100%;
    }

    .items-container {
        width: 100%;
    }
}

@media (max-width: 649px) {
    .content-wrapper {
        flex-direction: column;
        align-items: stretch;
    }

    .item-row {
        align-items: flex-start;
        gap: 0.5rem;
    }

    .time-display,
    .full-width-input {
        width: 100%;
        min-width: 100%;
    }

    .reference-image {
        width: 100%;
    }
}
</style>