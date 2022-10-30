<script setup lang="ts">
import { getUserHomePosts } from "@/utils/firebase"
import { useUserStore } from "@/utils/pinia"
import { onMounted, ref } from "vue"
import Spinner from "../loaders/spinner.vue"
import Post from "./post.vue"
const { user } = useUserStore()
const data = ref(await getUserHomePosts(user.data.subscribed))
const observerRef = ref<HTMLDivElement | null>(null)
const loading = ref(false)
onMounted(() => {
	const observer = new IntersectionObserver(async (entities, observer) => {
		if (entities[0].isIntersecting) {
			loading.value = true
			const responseData = await getUserHomePosts(
				user.data.subscribed,
				data.value?.lastVisible
			)
			if (responseData?.lastVisible === null) {
				observer.unobserve(entities[0].target)
			}
			data.value.lastVisible = responseData.lastVisible ?? null
			data.value.posts.push(...responseData!.posts)
			loading.value = false
		}
	})
	observer.observe(observerRef.value!)
})
</script>

<template>
	<div>
		<Post v-for="post in data!.posts" :key="post.id" v-bind="{ ...post }" />
		<Spinner v-if="loading" />
		<div ref="observerRef" class="h-28" />
	</div>
</template>
