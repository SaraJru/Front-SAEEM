import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap"
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

const app = createApp(App)

app.use(router)
app.mount('#app')