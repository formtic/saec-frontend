<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-dialog-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-loading-bar-provider :to="loadingBarTargetRef">
            <div ref="loadingBarTargetRef" style="
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: var(--n-border-radius);
        overflow: hidden;
        pointer-events: none;
      " />
      <loading-bar-trigger/>
            <router-view />
          </n-loading-bar-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script>
import { NConfigProvider, NLoadingBarProvider, useLoadingBar, NDialogProvider, NMessageProvider, NNotificationProvider } from 'naive-ui';
import themeOverrides from './theme/theme.js';
import { defineComponent, ref } from 'vue';
import { registerLoadingBar } from './compose/utils/loadingBarAnimation.js';
export default {
  name: 'App',
  components: {
    NConfigProvider,
    NLoadingBarProvider,
    LoadingBarTrigger: defineComponent({
      setup() {
        const loadingBar = useLoadingBar();
        registerLoadingBar(loadingBar);
      }
    })
  },
  setup() {
    const loadingBarTargetRef = ref(void 0);
    return { themeOverrides, loadingBarTargetRef };
  }
}
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
}

#app {
  height: 100%;
}
</style>