import { createRouter, createWebHistory } from "vue-router"
import Home from "./pages/home.vue"

const Test = () => import("./pages/test.vue")
const routes = [
	{ path: "/", component: Home },
	{ path: "/test", component: Test }
]

export const router = createRouter({
	routes,
	history: createWebHistory()
})
