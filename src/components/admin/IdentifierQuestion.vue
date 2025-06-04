<template>
    <div>
        <n-grid :cols="2" v-for="(element, index) in elements":key="index">
            <n-gi style="margin-right: 2.5px">
                <n-form-item label="Elemento" required>
                    <n-input v-model:value="element.name" placeholder="Elemento" />
                </n-form-item>
            </n-gi>
            <n-gi style="margin-left: 2.5px; display: flex; gap: 5px; align-items: center;">
                <n-form-item label="Valor" required style="width: 100%">
                    <n-input v-model:value="element.value" placeholder="Valor" />
                </n-form-item>
                <n-button color="red" @click="removeElement(index)">
                    <template #icon>
                        <n-icon :component="DeleteFilled" />
                    </template>
                </n-button>
            </n-gi>
        </n-grid>
        <div style="width: calc(100% - 1rem); display: flex; justify-content: center;">
            <n-button size="large" color="#0D5A79" @click="addElement">Agregar Elemento</n-button>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NGrid, NGi, NFormItem, NInput, NButton, NIcon } from "naive-ui";
import { DeleteFilled } from "@vicons/material";

export default defineComponent({
    components: {
        NGrid,
        NGi,
        NFormItem,
        NInput,
        NButton,
        NIcon
    },
    setup() {

        const elements = ref([{name: '', value:''}]);
        const addElement = () => {
            elements.value.push({ name: '', value: ''});
        };

        const removeElement = (index) => {
            if (elements.value.length > 1) {
                elements.value.splice(index, 1);
            }
        }
        return {
            elements,
            addElement,
            removeElement,
            DeleteFilled
        }
    }
})
</script>