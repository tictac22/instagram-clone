<script setup lang="ts">
import "cropperjs/dist/cropper.css"
import { computed, reactive } from "vue"
//const VueCropper = defineAsyncComponent(() => import("vue-cropperjs"))

import PostContext from "./context/postContext.vue"
import Cropping from "./cropping/cropping.vue"
import TopNavigation from "./topNavigation.vue"

interface State {
	open: boolean
	isDragging: boolean | null
}

const state = reactive<State>({
	open: true,
	isDragging: null
})
const closePopup = () => (state.open = false)
const openPopup = () => (state.open = true)

const isDraggingStyle = computed(() => ({
	pointerEvent: state.isDragging
		? "pointer-events-none"
		: "pointer-pointer-events-auto",
	open: state.open
		? "visible pointer-events-auto opacity-100 scale-100"
		: "invisble pointer-events-none opacity-0 scale-125 "
}))
</script>

<template>
	<font-awesome-icon
		icon="fa-solid fa-square-plus"
		class="ml-6 h-6 w-6 stroke-black stroke-[30px] text-white"
		@click.stop="openPopup"
	/>
	<Teleport to="#modal">
		<PostContext>
			<div
				:class="[isDraggingStyle.open]"
				class="fixed top-0 left-0 h-full w-full bg-black bg-opacity-70 transition-all"
			>
				<div class="flex min-h-full items-center justify-center">
					<font-awesome-icon
						icon="fa-solid fa-xmark"
						class="absolute top-2 right-2 h-5 w-5 text-white"
					/>
					<div
						v-click-outside="closePopup"
						class="flex h-[calc(100vmin-229px)] max-h-[900px] w-[calc(100vmin-229px)] max-w-[900px] scale-100 flex-col rounded bg-white"
					>
						<TopNavigation />
						<Cropping />
					</div>
				</div>
			</div>
		</PostContext>
	</Teleport>
</template>

<style scoped></style>
