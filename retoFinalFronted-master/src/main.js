import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap';
import './assets/app.css'
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'


var token = localStorage.getItem('token');
if(token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;



// Locally
createApp(App).use(router).use(VueAxios, axios).mount('#app')
