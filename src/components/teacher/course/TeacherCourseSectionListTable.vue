<template>
    <div class="p-3">
        <draggable :list="sections" item-key="id" :move="checkMove" :disabled="!sortSections">
            <template #item="{ element }">
                <div class="w-full">
                    <n-flex class="bg-blue-100 rounded p-2 border-1 border-primary-900 items-center" justify="space-between">
                        <div class="flex flex-col">
                            <n-text class="text-lg font-semibold">
                                {{ element.name }}
                            </n-text>
                            <n-text>
                                {{ element.description }}
                            </n-text>
                        </div>
                        <n-button>
                            <n-icon size="18">
                                <MoreVertFilled />
                            </n-icon>
                        </n-button>
                    </n-flex>
                </div>
            </template>

        </draggable>
    </div>
</template>
<script>
import { MoreVertFilled } from '@vicons/material';
import { defineComponent } from 'vue';
import draggable from 'vuedraggable'
export default defineComponent({
    data() {
    },
    props: {
        sortSections: Boolean,
        sections: Array,
    },
    methods: {
        checkMove: (e) => {
            console.log('index' + e.draggedContext.futureIndex)
        }
    },
    components: {
        draggable,
        MoreVertFilled
    }
});
</script>