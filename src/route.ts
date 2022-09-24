import { createRouter, createWebHistory } from "vue-router"

const Home = () => import("@/pages/home.vue")
const Test = () => import("./components/register/login/login.vue")
const SignUp = () => import("./components/register/signup/signup.vue")

const routes = [
	{ path: "/", component: Home },
	{ path: "/signup", component: SignUp },
	{ path: "/test", component: Test }
]

export const router = createRouter({
	routes,
	history: createWebHistory()
})
