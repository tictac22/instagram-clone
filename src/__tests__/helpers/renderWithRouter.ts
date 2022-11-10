import { createRouter, createWebHistory } from "vue-router"

const routes = [
	{
		path: "/",
		component: {
			template: "Welcome to the blogging app"
		}
	},
	{
		path: "/posts",
		component: {
			template: "Welcome to the blogging app"
		}
	}
]

export const router = createRouter({
	history: createWebHistory(),
	routes: routes
})
