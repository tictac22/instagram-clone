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
		class="w-6 h-6 ml-6 text-white stroke-black stroke-[30px]"
		@click.stop="openPopup"
	/>
	<Teleport to="#modal">
		<PostContext>
			<div
				:class="[isDraggingStyle.open]"
				class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 transition-all"
			>
				<div class="flex items-center justify-center min-h-full">
					<font-awesome-icon
						icon="fa-solid fa-xmark"
						class="text-white absolute top-2 right-2 w-5 h-5"
					/>
					<div
						v-click-outside="closePopup"
						class="bg-white scale-100 rounded h-[calc(100vmin-229px)] w-[calc(100vmin-229px)] max-h-[900px] max-w-[900px] flex flex-col"
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
