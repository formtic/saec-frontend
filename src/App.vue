<template>
  <div id="app">
    <n-config-provider :theme-overrides="themeOverrides">
      <router-view />
    </n-config-provider>
  </div>
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
};
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