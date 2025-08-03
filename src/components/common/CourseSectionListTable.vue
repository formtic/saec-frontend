<template>
    <div class="p-3">
        <draggable :list="sections" item-key="id" :move="checkMove" :disabled="!sortSections">
            <template #item="{ element }">
                <div class="w-full mt-2">
                    <n-flex class="w-full" align="center">
                        <n-flex class="bg-blue-100 rounded p-2 border-1 border-primary-900 items-center flex-1"
                            justify="space-between">
                            <div class="flex w-[12px] justify-center">
                                <n-text class="text-xs">
                                    {{ element.order + 1}}
                                </n-text>
                            </div>
                            <n-divider vertical></n-divider>
                            <div class="flex flex-col flex-1">
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
        return {
        }
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