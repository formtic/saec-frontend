<template>
  <ul class="text-white">
    <li
      v-for="item in options"
      :key="item.key"
      @click="$emit('select', item.key)"
      class="relative group"
    >
      <div
        :class="[
          'flex items-center py-3 px-4 cursor-pointer hover:bg-[#187DAC] transition-all',
          activeKey === item.key ? 'bg-[#187DAC]' : '',
        ]"
      >
        <component :is="item.icon" class="size-5" />
        <span
          class="ml-3 transition-all duration-300"
          :class="
            collapsed
              ? 'opacity-0 scale-0 w-0'
              : 'opacity-100 scale-100 w-auto whitespace-nowrap'
          "
        >
          {{ item.label }}
        </span>
      </div>
      <span
        v-if="collapsed"
        class="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-sm px-2 py-1 rounded-xl shadow opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none whitespace-nowrap"
      >
        {{ item.label }}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    options: Array,
    activeKey: String,
    collapsed: Boolean,
  },
};
</script>
