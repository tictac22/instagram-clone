import { RoutePaths } from "@/utils/paths"
import { createRouter, createWebHistory } from "vue-router"
const Home = () => import("@/pages/home.vue")
const SignUp = () => import("@/pages/register/signup.vue")
const Login = () => import("@/pages/register/login.vue")
const PostModalHome = () => import("@/components/post/modal/modalPost.vue")
const PostPage = () => import("@/pages/post.vue")
const UserPage = () => import("@/pages/user.vue")
const routes = [
	{
		path: RoutePaths.POST,
		component: PostPage,
		name: "Post"
	},
	{
		path: RoutePaths.HOME,
		component: Home,
		name: "Home",
		children: [
			{
				path: RoutePaths.POST,
				component: PostModalHome,
				name: "PostChildren"
			}
		]
	},
	{
		path: RoutePaths.USER,
		component: UserPage,
		children: [
			{
				path: RoutePaths.POST,
				component: PostModalHome,
				name: "UserPost"
			}
		]
	},
	{ path: RoutePaths.SIGNUP, component: SignUp },
	{ path: RoutePaths.LOGIN, component: Login }
]

export const router = createRouter({
	routes,
	history: createWebHistory()
})
