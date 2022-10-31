<script setup lang="ts">
import Spinner from "@/components/loaders/spinner.vue"
import SquarePost from "@/shared/squarePost.vue"
import { getUserPosts } from "@/utils/firebase"
import { onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
const route = useRoute()

const data = ref(await getUserPosts(route.params.id as string))
const loading = ref(false)
watch(
	() => route.path,
	async (value, prev) => {
		if (!value.startsWith("/p/") && !prev.startsWith("/p/")) {
			loading.value = true
			data.value = await getUserPosts(route.params.id as string)
			window.scrollTo(0, 0)
			loading.value = false
		}
	}
)

const observerRef = ref<HTMLDivElement | null>(null)
onMounted(() => {
	const observer = new IntersectionObserver(async (entities, observer) => {
		if (entities[0].isIntersecting) {
			const responseData = await getUserPosts(
				route.params.id as string,
				data.value.lastVisible
			)
			if (responseData?.lastVisible === null) {
				observer.unobserve(entities[0].target)
			}
			data.value.lastVisible = responseData.lastVisible ?? null
			data.value.posts.push(...responseData!.posts)
		}
	})
	observer.observe(observerRef.value!)
})
</script>

<template>
	<div
		v-if="!loading"
		class="mb-10 grid w-[935px] max-w-full grid-cols-3 gap-[28px]"
	>
		<SquarePost
			v-for="post in data?.posts"
			:key="post.id"
			:post="post"
			:to="'UserPost'"
		/>
	</div>
	<Spinner v-if="data.lastVisible" />
	<div ref="observerRef" class="h-7 w-full" />
</template>
