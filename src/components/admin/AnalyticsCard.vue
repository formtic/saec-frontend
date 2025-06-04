<template>
  <n-card content-style="padding: 0">
    <div style="display: flex; flex-direction: column; align-items: center">
      <div style="display: flex; align-items: center; gap: 1rem">
        <n-icon :component="icon" size="20" class="card-icon"/>
        <h3 style="font-weight: 400">{{ title }}</h3>
      </div>
      <div style="font-size: 1.2rem; font-weight: bold">
        <span style="color: #0d5a79; font-size: 24px">{{ counter }}</span>
      </div>
    </div>
  </n-card>
</template>

<script>
import { defineComponent } from "vue";
import { NCard, NIcon } from "naive-ui";

export default defineComponent({
  name: "AnalyticsCard",
  props: {
    icon: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    counter: {
      type: String,
      required: true,
    },
  },
  components: {
    NCard,
    NIcon,
  },
});
</script>

<style>
     
    @media (max-width: 1159px) {
        .card-icon{
            display:none;
        }
    }
</style>