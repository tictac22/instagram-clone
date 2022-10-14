<script setup lang="ts">
import Header from "@/components/header/header.vue"
import LoginHome from "@/components/register/login/loginHome.vue"
import { useUserStore } from "@/utils/pinia"
import { defineAsyncComponent } from "vue"
const { user } = useUserStore()

const PostWrapper = defineAsyncComponent(
	() => import("@/components/post/postWrapper.vue")
)
</script>

<template>
	<LoginHome v-if="user.isAuthenticated === false" />
	<div v-else>
		<Header />
		<div class="m-auto mt-8 max-w-4xl px-3">
			<div class="flex items-center">
				<div class="mr-8 w-full max-w-[470px]">
					<Suspense>
						<PostWrapper v-if="user" />
						<template #fallback> ...loading </template>
					</Suspense>
				</div>
				<div class="mt-4 flex items-center self-start">
					<img
						alt="default"
						src="/default.jpg"
						class="mr-3 h-14 w-14 rounded-full"
					/>
					<div>
						<p class="font-medium">whitemoooo</p>
						<p class="text-gray-400">artemida</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
