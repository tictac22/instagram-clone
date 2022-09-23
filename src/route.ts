import Home from "@/pages/home.vue"
import { createRouter, createWebHistory } from "vue-router"

const Test = () => import("./components/register/login/login.vue")
const routes = [
	{ path: "/", component: Home },
	{ path: "/test", component: Test }
]

export const router = createRouter({
	routes,
	history: createWebHistory()
})
