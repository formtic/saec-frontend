<template>
  <n-layout style="height: 100vh; overflow: hidden;">
    <!-- Mobile Header -->
    <n-layout-header class="mobile-header" bordered>
      <img :src="logo" alt="Logo" class="mobile-logo">
      <n-button @click="showMobileMenu = true" quaternary>
        <template #icon>
          <n-icon color="#ffffff" size="30"><MenuFilled /></n-icon>
        </template>
      </n-button>
    </n-layout-header>

    <!-- Mobile Menu Drawer -->
    <n-drawer v-model:show="showMobileMenu" :width="240" placement="right">
      <n-drawer-content style="padding: 0; background-color: #0d5a79;">
        <div style="display: flex; flex-direction: column; height: 100%;">
          <div class="logo-container">
            <img :src="logo" alt="Logo" class="logo-img">
          </div>
          <n-menu 
            :options="topMenuOptions" 
            :theme-overrides="menuTheme"
            :value="activeKey"
            @update:value="handleMenuClick"
          />
          <div style="flex-grow: 1;"></div>
          <n-menu 
            :options="bottomMenuOptions" 
            :theme-overrides="menuTheme"
            :value="activeKey"
            @update:value="handleMenuClick"
          />
        </div>
      </n-drawer-content>
    </n-drawer>

    <!-- Desktop Layout -->
    <n-layout has-sider style="height: 100%;">
      <n-layout-sider 
        class="desktop-sider" 
        bordered 
        show-trigger 
        collapse-mode="width" 
        :collapsed-width="64" 
        :width="240" 
        style="height: 100vh; overflow-y: unset; position: sticky; top: 0;"
      >
        <div style="display: flex; flex-direction: column; height: 100%;">
          <div class="logo-container">
            <img :src="logo" alt="Logo" class="logo-img">
          </div>
          <n-menu 
            :options="topMenuOptions" 
            :theme-overrides="menuTheme" 
            :collapsed-icon-size="25" 
            class="custom-collapsed-menu"
            :value="activeKey"
            @update:value="handleMenuClick"
          />
          <div style="flex-grow: 1;"></div>
          <n-menu 
            :options="bottomMenuOptions" 
            :theme-overrides="menuTheme" 
            :collapsed-icon-size="25" 
            class="custom-collapsed-menu"
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
import { defineComponent, h, ref, watch } from "vue";
import { 
  NLayout, 
  NLayoutSider, 
  NLayoutHeader, 
  NLayoutContent, 
  NMenu, 
  NIcon, 
  NButton, 
  NDrawer, 
  NDrawerContent 
} from "naive-ui";
import { 
  DashboardFilled, 
  HomeFilled, 
  PeopleAltFilled, 
  BookFilled, 
  LogOutFilled, 
  PersonFilled, 
  MenuFilled 
} from "@vicons/material";
import logo from "../../assets/svg/logoDarkmode.svg";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  components: {
    NLayout, 
    NLayoutSider, 
    NLayoutHeader,
    NLayoutContent,
    NMenu, 
    NIcon,
    NButton,
    NDrawer,
    NDrawerContent,
    MenuFilled,
  },
  setup() {
    const showMobileMenu = ref(false);
    const router = useRouter();
    const route = useRoute();

    // Función para determinar la clave activa basada en la ruta
    const getActiveKeyFromPath = (path) => {
      const parts = path.split('/').filter(part => part !== '');
      
      // Rutas base
      if (parts.length <= 1 || (parts.length === 2 && parts[1] === 'admin')) {
        return 'dashboard';
      }
      
      // Verifica si estamos en alguna subruta de las opciones principales
      const mainRoutes = ['dashboard', 'courses', 'employees', 'departments', 'profile'];
      const currentMainRoute = parts[1];
      
      // Si es una ruta principal, devuélvela directamente
      if (mainRoutes.includes(currentMainRoute)) {
        return currentMainRoute;
      }
      
      // Para subrutas como /admin/employees/new, etc.
      // Busca en el historial la última ruta principal visitada
      const matchedRoute = router.currentRoute.value.matched.find(route => {
        return mainRoutes.some(mainRoute => route.path.includes(mainRoute));
      });
      
      if (matchedRoute) {
        const matchedPath = matchedRoute.path;
        const matchedMainRoute = matchedPath.split('/').find(part => mainRoutes.includes(part));
        return matchedMainRoute || 'dashboard';
      }
      
      return 'dashboard';
    };

    const activeKey = ref(getActiveKeyFromPath(route.path));

    // Observa cambios en la ruta
    watch(
      () => route.path,
      (newPath) => {
        activeKey.value = getActiveKeyFromPath(newPath);
      }
    );

    const renderIcon = (icon) => {
      return () => h(NIcon, null, { default: () => h(icon) });
    }

    const topMenuOptions = [
      { label: 'Panel General', key: 'dashboard', icon: renderIcon(DashboardFilled)},
      { label: 'Cursos', key: 'courses', icon: renderIcon(BookFilled)},
      { label: 'Empleados', key: 'employees', icon: renderIcon(PeopleAltFilled)},
      { label: 'Departamentos', key: 'departments', icon: renderIcon(HomeFilled)}
    ];
    
    const bottomMenuOptions = [
      { label: 'Perfil', key: 'profile', icon: renderIcon(PersonFilled)},
      { label: 'Cerrar Sesión', key: 'logout', icon: renderIcon(LogOutFilled)}
    ];

    const handleMenuClick = (key) => {
      switch (key) {
        case 'dashboard':
          router.push('/admin/');
          break;
        case 'courses':
          router.push('/admin/courses');
          break;
        case 'employees':
          router.push('/admin/employees');
          break;
        case 'departments':
          router.push('/admin/departments');
          break;
        case 'profile': 
          router.push('/admin/profile');
          break;
        case 'logout':
          window.location.href = '/';
          break;
      }
      showMobileMenu.value = false;
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
    
    return {
      topMenuOptions,
      bottomMenuOptions,
      menuTheme,
      logo,
      showMobileMenu,
      handleMenuClick,
      activeKey,
    }
  }
})
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