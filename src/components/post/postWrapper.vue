<script setup lang="ts">
import { getUserHomePosts } from "@/utils/firebase"
import { useUserStore } from "@/utils/pinia"
import { onMounted, ref } from "vue"
import Post from "./post.vue"
const { user } = useUserStore()
const data = ref(await getUserHomePosts(user.data.subscribed))
const observerRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
	const observer = new IntersectionObserver(async (entities, observer) => {
		if (entities[0].isIntersecting) {
			const responseData = await getUserHomePosts(
				user.data.subscribed,
				data.value?.lastVisible
			)
			if (responseData?.lastVisible === null) {
				observer.unobserve(entities[0].target)
			}
			Object.assign(data, {
				posts: data.value?.posts.push(...responseData!.posts),
				lastVisible: responseData?.lastVisible
			})
		}
	})
	observer.observe(observerRef.value!)
})
</script>

<template>
	<div>
		<Post v-for="post in data!.posts" :key="post.id" v-bind="{ ...post }" />
		<div ref="observerRef" />
	</div>
</template>
