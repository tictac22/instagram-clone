<script setup lang="ts">
import { useUserStore } from "@/utils/pinia"
import { computed, ref } from "vue"
const store = useUserStore()
const { user, handleLike: handleStoreLike } = store
const props = defineProps<{
	id: string
}>()

const animate = ref(false)
const isLiked = computed(
	() => user && user.data.likes.find(item => item === props.id)
)

const handleLike = () => {
	console.log("work")
	!isLiked.value ? (animate.value = true) : ""
	handleStoreLike(props.id)

	setTimeout(() => {
		animate.value = false
	}, 1000)
}

defineExpose({
	handleLike
})
</script>

<template>
	<div
		class="absolute top-1/2 left-1/2 z-[3] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
		@dblclick="handleLike"
		@mousedown.prevent="() => {}"
	>
		<font-awesome-icon
			icon="fa-solid fa-heart"
			class="h-20 w-20 scale-0 stroke-[39px] text-white opacity-0"
			:class="animate ? 'animate-[heart_1000ms_ease-out]' : ''"
		/>
	</div>
</template>
