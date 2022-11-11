<script setup lang="ts">
import { getUserPage } from "@/utils/firebase"
import { nFormatter } from "@/utils/helperFunctions"
import { useHead } from "@vueuse/head"
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import Follow from "../follow.vue"
import Spinner from "../loaders/spinner.vue"

const route = useRoute()

const user = ref(await getUserPage(route.params.id as string))
const loading = ref(false)

useHead({
	title: user.value.fullName + " " + `@${user.value.userName}`
})
watch(
	() => route.path,
	async (value, prev) => {
		if (!value.startsWith("/p/") && !prev.startsWith("/p/")) {
			loading.value = true
			user.value = await getUserPage(route.params.id as string)
			loading.value = false
		}
	}
)
const subscribeCount = ref<HTMLDivElement | null>(null)
const updateSubscribeValue = (subscribe: boolean) => {
	const text = parseInt(subscribeCount.value!.innerHTML)
	if (subscribe) {
		subscribeCount.value!.innerHTML = `${nFormatter(text + 1)}`
		return
	}
	subscribeCount.value!.innerHTML = `${nFormatter(text - 1)}`
}
</script>
<template>
	<Spinner v-if="loading" />
	<div v-else class="flex">
		<div class="mr-[30px] grow">
			<img
				class="m-auto h-[150px] w-[150px] rounded-full"
				:src="user.photoUrl ?? '/default.jpg'"
			/>
		</div>
		<div class="grow-[2]">
			<div class="flex items-center">
				<h2 class="text-lg">
					{{ user.userName }}
				</h2>
				<Follow
					v-if="user"
					:id="user.uid"
					@update-count="updateSubscribeValue"
				/>
			</div>
			<div class="my-[20px] flex items-center">
				<p>
					<span class="font-medium">{{
						nFormatter(user.postsNumber)
					}}</span>
					Posts
				</p>
				<p class="ml-[40px]">
					<span ref="subscribeCount" class="font-medium">{{
						nFormatter(user.followers)
					}}</span>
					followers
				</p>
			</div>
			<p class="font-medium">
				{{ user.fullName }}
			</p>
		</div>
	</div>
</template>
