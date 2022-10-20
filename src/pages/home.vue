<script setup lang="ts">
import LoginHome from "@/components/register/login/loginHome.vue"
import PageWrapper from "@/components/tools/pageWrapper.vue"
import { useUserStore } from "@/utils/pinia"
import { defineAsyncComponent } from "vue"
import ModalHome from "../components/post/modal/modalHome.vue"
const { user } = useUserStore()

const PostWrapper = defineAsyncComponent(
	() => import("@/components/post/postWrapper.vue")
)
</script>

<template>
	<LoginHome v-if="user.isAuthenticated === false" />
	<PageWrapper v-else>
		<ModalHome />
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
					:src="
						user.data.photoUrl ? user.data.photoUrl : '/default.jpg'
					"
					class="mr-3 h-14 w-14 rounded-full"
				/>
				<div>
					<p class="font-medium">{{ user.data.userName }}</p>
					<p class="text-gray-400">{{ user.data.fullName }}</p>
				</div>
			</div>
		</div>
	</PageWrapper>
</template>
