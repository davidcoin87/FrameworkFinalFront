import {createWebHistory, createRouter} from 'vue-router'
import Estudiantes from '@/views/Asignatura.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import ViewUser from '@/views/ViewUser.vue'


const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Courses',
        name: 'Asignatura',
        component: Estudiantes
    },
    {
      path: '/ViewUser',
      name: 'Asignaturas',
      component: ViewUser
  },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;