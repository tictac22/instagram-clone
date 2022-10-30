<script setup lang="ts">
import InstagramLogo from "@/assets/InstagramLogo.vue"
import { RoutePaths } from "@/utils/paths"
import { useUserStore } from "@/utils/pinia"
import { useRoute } from "vue-router"
import CreatePost from "../postForm.vue/context/postContext.vue"
import Dropdown from "./dropdown.vue"
import LoadingBar from "./loadingBar.vue"
import Search from "./search.vue"
const route = useRoute()
const { user } = useUserStore()
</script>

<template>
	<header
		class="sticky top-0 z-20 border-b border-solid border-[#DBDBDB] bg-white"
	>
		<div
			class="m-auto flex h-[60px] max-w-5xl items-center justify-between px-5"
		>
			<div>
				<RouterLink to="/">
					<InstagramLogo />
				</RouterLink>
			</div>
			<Search />
			<div class="flex items-center">
				<div v-if="!user.isAuthenticated">
					<RouterLink
						:to="RoutePaths.LOGIN"
						class="inline-block rounded bg-blue-500 px-3 py-1 uppercase text-white"
					>
						Log in
					</RouterLink>
					<RouterLink
						:to="RoutePaths.SIGNUP"
						class="inline-block rounded px-3 py-1 uppercase text-blue-500"
					>
						Sign up
					</RouterLink>
				</div>
				<template v-else>
					<RouterLink to="/">
						<font-awesome-icon
							icon="fa-solid fa-house"
							class="ml-6 h-6 w-6 stroke-black stroke-[30px]"
							:class="[
								route.path === '/' ? 'text-black' : 'text-white'
							]"
						/>
					</RouterLink>
					<CreatePost />
					<RouterLink to="/explore" class="ml-6">
						<font-awesome-icon
							icon="fa-solid fa-compass"
							class="h-6 w-6 cursor-pointer stroke-black stroke-[30px]"
							:class="[
								route.path === '/explore'
									? 'text-black'
									: 'text-white'
							]"
						/>
					</RouterLink>
					<Dropdown />
				</template>
			</div>
		</div>
	</header>
	<LoadingBar />
</template>
