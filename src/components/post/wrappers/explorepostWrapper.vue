<script setup lang="ts">
import Spinner from "@/components/loaders/spinner.vue"
import SquarePost from "@/shared/squarePost.vue"
import { getExplorePosts } from "@/utils/firebase"
import { onMounted, ref } from "vue"
const data = ref(await getExplorePosts())

const observerRef = ref<HTMLDivElement | null>(null)
onMounted(() => {
	const observer = new IntersectionObserver(async (entities, observer) => {
		if (entities[0].isIntersecting) {
			const responseData = await getExplorePosts(data.value.lastVisible)
			if (responseData?.lastVisible === null) {
				observer.unobserve(entities[0].target)
			}
			data.value.lastVisible = responseData.lastVisible ?? null
			data.value.posts.push(...responseData.posts)
		}
	})
	observer.observe(observerRef.value!)
})
</script>

<template>
	<div class="grid w-[935px] max-w-full grid-cols-3 gap-[28px]">
		<SquarePost
			v-for="post in data.posts"
			:key="post.id"
			:post="post"
			:to="'ExplorePost'"
		/>
	</div>
	<div class="my-4">
		<Spinner v-if="data.lastVisible" />
		<div ref="observerRef" class="h-7 w-full" />
	</div>
</template>
