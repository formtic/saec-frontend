<template>
    <div class="p-3">
        <draggable :list="sections" item-key="id" :move="checkMove" @change="checkChange" :disabled="!sortSections">
            <template #item="{ element }">
                <div class="w-full mt-2">
                    <n-flex class="w-full" align="center">
                        <n-flex class=" rounded p-2 items-center flex-1 shadow-sm" justify="space-between">
                            <div class="flex w-[12px] justify-center">
                                <n-text class="text-xs">
                                    {{ element.order + 1 }}
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
                            <n-button @click="navigateSection(element.id)">
                                <n-icon size="18">
                                    <EditOutlined />
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
import { EditOutlined, MoreVertFilled } from '@vicons/material';
import { defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import draggable from 'vuedraggable'
export default defineComponent({
    props: {
        sortSections: Boolean,
        sections: Array,
    },
    data() {
        return {
            router: useRouter(),
            route: useRoute(),
        }
    },
    methods: {
        checkMove: (e) => {
            //console.log('index' + e.draggedContext.futureIndex)
        },
        checkChange(e) {
            this.sections.forEach((s,i) => s.order = i);
        },
        navigateSection(id) {
            this.router.push(`${this.route.path}/set/${id}`)
        }
    },
    components: {
        draggable,
        MoreVertFilled,
        EditOutlined
    }
});
</script>