<template>
  <n-layout style="height: 100vh; overflow: hidden">
    <n-layout-header class="mobile-header" bordered>
      <img :src="logo" alt="Logo IPM" class="mobile-logo"/>
      <n-button @click="showMobileMenu=true" quaternary>
        <template #icon>
          <n-icon color="#ffffff" size="30"><MenuFilled /></n-icon>
        </template>
      </n-button>
    </n-layout-header>

    <n-drawer v-model:show="showMobileMenu" :width="240" placement="right">
      <n-drawer-content style="padding:0; background-color: #0d5a79;">
        <div style="display:flex;flex-direction:column; height: 100%;">
          <div class="logo-container">
            <img :src="logo" alt="Logo IPM" class="logo-img"/>
          </div>
          <n-menu
            :options="topMenuOptions"
            :theme-overrides="menuTheme"
            :value="activeKey"
            @update:value="handleMenuClick"
          />
          <div style="flex-grow: 1"></div>
          <n-menu
            :options="bottomMenuOptions"
            :theme-overrides="menuTheme"
            :value="activeKey"
            @update:value="handleMenuClick"
          />
        </div>
      </n-drawer-content>
    </n-drawer>

    <n-layout has-sider style="height: 100%">

      <n-layout-sider class="desktop-sider" bordered show-trigger collapse-mode="width" :collapsed-width="64" :width="240" style="height: 100vh; overflow-y: unset; position:sticky;top: 0;">
        <div style="display:flex; flex-direction: column; height: 100%;">
          <div class="logo-container">
            <img :src="logo" alt="Logo IPM" class="logo-img"/>
          </div>
          <n-menu
          class="custom-collapsed-menu"
            :options="topMenuOptions"
            :theme-overrides="menuTheme"
            :collapsed-icon-size="25"
            :value="activeKey"
            @update:value="handleMenuClick"
          />
          <div style="flex-grow: 1"></div>
          <n-menu
          class="custom-collapsed-menu"
            :options="bottomMenuOptions"
            :theme-overrides="menuTheme"
            :collapsed-icon-size="25"
            :value="activeKey"
            @update:value="handleMenuClick"
          />
        </div>
      </n-layout-sider>

      <n-layout-content style="height: 100vh; overflow-y: auto;">
        <router-view />
      </n-layout-content>
      
    </n-layout>
  </n-layout>
</template>

<script>
import { defineComponent, ref, watch ,h} from "vue";
import {
  NLayout,
  NLayoutContent,
  NButton,
  NLayoutHeader,
  NLayoutSider,
  NDrawer,
  NDrawerContent,
  NMenu,
  NIcon,
} from "naive-ui";
import {
  BookFilled,
  LogOutFilled,
  MenuFilled,
  PersonFilled,
} from "@vicons/material";
import logo from "@/assets/svg/logoDarkmode.svg";
import { useRouter, useRoute } from "vue-router";
import {logout} from "../service/authService"
export default defineComponent({
  components: {
    NLayout,
    NLayoutContent,
    NButton,
    NLayoutHeader,
    NLayoutSider,
    NDrawer,
    NDrawerContent,
    NMenu,
    NIcon,
    BookFilled,
    LogOutFilled,
    MenuFilled,
    PersonFilled,
  },
  setup() {
    let showMobileMenu = ref(false);
    const router = useRouter();
    const route = useRoute();

    const getActiveKeyFromPath = (path) => {
      const parts = path.split("/").filter((part) => part !== "");

      if (
        parts.length <= 1 ||
        (parts.length === 2 && parts[1] === "reviewer")
      ) {
        return "courses";
      }

      const mainRoutes = ["courses", "profile"];
      const currentMainRoute = parts[1];

      if (mainRoutes.includes(currentMainRoute)) {
        return currentMainRoute;
      }

      const matchedRoute = router.currentRoute.value.matched.find((route) => {
        return mainRoutes.some((mainRoute) => route.path.includes(mainRoute));
      });

      if (matchedRoute) {
        const matchedPath = matchedRoute.path;
        const matchedMainRoute = matchedPath
          .split("/")
          .filter((part) => mainRoutes.includes(part));
        return matchedMainRoute || "courses";
      }

      return "courses";
    };

    const activeKey = ref(getActiveKeyFromPath(route.path));

    watch(
      () => route.path,
      (newPath) => {
        activeKey.value = getActiveKeyFromPath(newPath);
      }
    );
    const renderIcon = (icon) => {
      return () => h(NIcon, null, { default: () => h(icon) });
    };

    const topMenuOptions = [
      { label: "Cursos", key: "courses", icon: renderIcon(BookFilled) },
    ];

    const bottomMenuOptions = [
      { label: "Perfil", key: "profile", icon: renderIcon(PersonFilled) },
      { label: "Cerrar Sesión", key: "logout", icon: renderIcon(LogOutFilled) },
    ];

    const handleMenuClick=(key)=>{
        switch(key){
            case 'courses':
            case 'Cursos':
                router.push('/reviewer/');
                break;
            case 'profile':
                router.push('/reviewer/profile');
                break;
            case 'logout':
                logout()
;                break;
        }
        showMobileMenu = false;
    }

    const menuTheme = {
        itemIconColorCollapsed: "#ffffff",
      itemColorHover: "#187DAC",
      itemTextColor: "#ffffff",
      itemTextColorHover: "#ffffff",
      itemPaddingCollapsed: "12px",
      itemIconSizeCollapsed: "24px",
      itemIconColor: "#ffffff",
      itemIconColorHover: "#ffffff",
      itemColorActive: "#187DAC",
      itemTextColorActive: "#ffffff",
      itemTextColorActiveHover: "#ffffff",
      itemIconColorActiveHover: "#ffffff",
      itemColorActiveHover: "#187DAC",
      itemIconColorActive: "#ffffff",
      itemColorActiveCollapsed: "#187DAC",
      itemTextColorActiveCollapsed: "#ffffff",
      itemIconColorActiveCollapsed: "#ffffff",
      itemTextColorCollapsed: "transparent"
    }

    return{
        topMenuOptions,
      bottomMenuOptions,
      menuTheme,
      logo,
      showMobileMenu,
      handleMenuClick,
      activeKey,
    }
  },
});
</script>

<style scoped>
.desktop-sider {
  background-color: #0d5a79; 
  height: 100vh;

}

.mobile-header {
  display: none;
  padding: 0 16px; 
  height: 64px; 
  align-items: center; 
  background-color: #0d5a79;
  justify-content: space-between;
}

.mobile-logo {
  height: 40px; 
  margin-left: 16px;
}

.logo-container {
  padding: 20px 0 20px 10px; 
  display: flex; 
  justify-content: start; 
  align-items: center;
}

.logo-img {
  max-width: 80%; 
  height: auto;
}

@media (max-width: 885px) {
  .desktop-sider {
    display: none !important;
  }
  
  .mobile-header {
    display: flex;
  }
}

@media (min-width: 886px) {
  .mobile-header {
    display: none;
  }
  
  .desktop-sider {
    display: block;
  }
}
</style>