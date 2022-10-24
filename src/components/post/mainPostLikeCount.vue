<script setup lang="ts">
import { useUserStore } from "@/utils/pinia"
import { computed, ref } from "vue"

const props = defineProps<{
	likes: number
	id: string
}>()

const postLikes = ref<HTMLDivElement | null>(null)

const { user } = useUserStore()
const isLiked = computed(
	() => user && user.data.likes.find(item => item === props.id)
)
const updateLikeText = () => {
	const text = parseInt(postLikes.value!.innerHTML)
	if (isLiked.value) {
		postLikes.value!.innerHTML = `${text - 1}`
		return
	}
	postLikes.value!.innerHTML = `${text + 1}`
}
defineExpose({
	updateLikeText
})
</script>

<template>
	<p ref="postLikes" class="font-medium">{{ props.likes }} likes</p>
</template>
