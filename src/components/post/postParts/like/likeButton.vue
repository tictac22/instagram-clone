<script setup lang="ts">
import { useUserStore } from "@/utils/pinia"
import { computed, ref } from "vue"

const { user } = useUserStore()
const props = defineProps<{
	id: string
}>()
defineEmits<{
	(e: "handleLike"): void
}>()
const isLiked = computed(
	() => user && user.data.likes.find(item => item === props.id)
)
const animate = ref(false)
const animationLeave = () => {
	if (!isLiked.value) animate.value = true

	setTimeout(() => {
		animate.value = false
	}, 500)
}
</script>

<template>
	<font-awesome-icon
		icon="fa-solid fa-heart"
		class="mr-2 h-6 w-6 cursor-pointer stroke-black stroke-[39px] transition-opacity hover:opacity-60"
		tabindex="0"
		:class="[
			isLiked ? 'stroke-red-500 text-red-500' : 'text-white',
			animate ? 'animate-[likeButton_500ms_ease-out]' : ''
		]"
		@mouseleave.prevent="animationLeave"
		@click="$emit('handleLike')"
		@keydown.enter="$emit('handleLike')"
	/>
</template>
