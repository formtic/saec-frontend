<template>
    <div class="time-matching">
        <n-text tag="p" strong class="question-text">
            1.- Condiciones de trabajo: Según la imagen coloca el número que corresponda de acuerdo a lo que se te pide:
        </n-text>

        <div class="content-wrapper">
            <div class="image-container">
                <n-image class="style-image" width="400" src="../../../public/example_image.jpg" alt="Imagen"
                    preview-enable />
            </div>

            <div class="items-container">
                <div v-for="(item, index) in timeItems" :key="index" class="item-row">
                    <n-text class="time-display">
                        {{ item.label }}
                    </n-text>
                    <n-input v-model:value="item.answer" type="text" placeholder="Escribe la correspondencia..."
                        clearable class="full-width-input" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { NInput, NText, NImage } from "naive-ui"

const timeItems = ref([
    { label: "Mesa de trabajo", answer: "" },
    { label: "Gaveta para rechazo", answer: "" },
    { label: "Gaveta para subensambles", answer: "" },
    { label: "Adaptador", answer: "" },
    { label: "Aguja", answer: "" }
])
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

/* Diseño para pantallas medianas (650px - 1099px) */
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