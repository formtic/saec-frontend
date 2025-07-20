<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-dialog-provider>
      <n-message-provider>
        <n-notification-provider>
          <router-view />
        </n-notification-provider>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script>
import { NConfigProvider } from 'naive-ui';
import themeOverrides from './theme/theme.js';

export default {
  name: 'App',
  components: {
    NConfigProvider
  },
  setup() {
    return {themeOverrides};
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