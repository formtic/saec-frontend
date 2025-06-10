import { createApp } from 'vue'
import App from '@/App.vue'
import router from "@/router/main"
import naive from 'naive-ui';
import './styles/index.css';
const app = createApp(App);
app.use(router);
app.use(naive);
app.mount('#app');