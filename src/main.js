import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap"
import axios from 'axios'
import store from './store'

axios.defaults.baseURL = 'https://pg2umg.pythonanywhere.com/'

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')