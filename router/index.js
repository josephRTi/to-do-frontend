import {createRouter, createWebHistory} from 'vue-router'
import TaskList from "@/components/TaskList";
import TheRegister from "@/components/TheRegister";
import TheIndex from "@/components/TheIndex";

const routes = [
    {
        path: '/',
        name: 'Главная',
        component: TheIndex,
        alias: '/index'
    },
    {
        path: '/register',
        name: 'Регистрация',
        component: TheRegister
    },
    {
        path: '/task_list',
        name: 'Список задач',
        component: TaskList
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active'
})

export default router
