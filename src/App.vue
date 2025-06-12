<template>
  <n-config-provider>
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
export default {
  name: 'App'
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