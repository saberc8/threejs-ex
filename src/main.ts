import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'
import 'element-plus/es/components/message/style/css'


const app = createApp(App)
app.use(router)

app.mount('#app')
