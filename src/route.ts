import { RoutePaths } from "@/utils/paths"
import { createRouter, createWebHistory } from "vue-router"
const Home = () => import("@/pages/home.vue")
const SignUp = () => import("@/pages/register/signup.vue")
const Login = () => import("@/pages/register/login.vue")

const routes = [
	{ path: RoutePaths.HOME, component: Home },
	{ path: RoutePaths.SIGNUP, component: SignUp },
	{ path: RoutePaths.LOGIN, component: Login }
]

export const router = createRouter({
	routes,
	history: createWebHistory()
})
