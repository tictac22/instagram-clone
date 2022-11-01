<script setup lang="ts">
import Spinner from "@/components/loaders/spinner.vue"
import LoginHome from "@/components/register/login/loginHome.vue"
import PageWrapper from "@/layouts/pageWrapper.vue"
import ModalPostLoader from "@/shared/modalPostLoader.vue"
import { RoutePaths } from "@/utils/paths"
import { useUserStore } from "@/utils/pinia"
import { useHead } from "@vueuse/head"
import { defineAsyncComponent } from "vue"

useHead({
	title: "Instagram"
})
const { user } = useUserStore()

const HomePostWrapper = defineAsyncComponent(
	() => import("@/components/post/wrappers/HomePostWrapper.vue")
)
</script>

<template>
	<LoginHome v-if="user.isAuthenticated === false" />
	<PageWrapper v-else>
		<ModalPostLoader />
		<div class="flex items-center">
			<div class="mr-8 w-full max-w-[470px]">
				<div
					v-if="user && user.data.subscribed.length === 0"
					class="text-center"
				>
					<p>Currently you have 0 subscriptions</p>
					<span>
						Go to
						<RouterLink
							:to="RoutePaths.EXPLORE"
							class="text-blue-500 hover:underline"
							>explore page</RouterLink
						>
						to find intersing people for you
					</span>
				</div>
				<Suspense>
					<HomePostWrapper v-if="user" />
					<template #fallback> <Spinner /> </template>
				</Suspense>
			</div>
			<div class="mt-4 flex items-center self-start">
				<img
					alt="default"
					:src="
						user.data.photoUrl ? user.data.photoUrl : '/default.jpg'
					"
					class="mr-3 h-14 w-14 rounded-full"
				/>
				<RouterLink :to="`/${user.data.uid}`">
					<div>
						<p class="font-medium hover:underline">
							{{ user.data.userName }}
						</p>
						<p class="text-gray-400 hover:underline">
							{{ user.data.fullName }}
						</p>
					</div>
				</RouterLink>
			</div>
		</div>
	</PageWrapper>
</template>
