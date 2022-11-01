<script setup lang="ts">
import Spinner from "@/components/loaders/spinner.vue"
import { getPostComments } from "@/utils/firebase"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import Comment from "./comment.vue"
const route = useRoute()
const data = ref(await getPostComments(route.params.id as string))
const observerRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
	const observer = new IntersectionObserver(async (entities, observer) => {
		if (entities[0].isIntersecting) {
			const responseData = await getPostComments(
				route.params.id as string,
				data.value.lastVisible
			)
			if (responseData?.lastVisible === null) {
				observer.unobserve(entities[0].target)
			}
			data.value.lastVisible = responseData.lastVisible ?? null
			data.value.comments.push(...responseData.comments)
		}
	})
	observer.observe(observerRef.value!)
})
</script>
<template>
	<Comment
		v-for="comment in data.comments"
		:key="comment.id"
		v-bind="comment"
	/>
	<div class="my-4">
		<Spinner v-if="data.lastVisible" />
		<div ref="observerRef" class="h-7 w-full" />
	</div>
</template>
