<script setup lang="ts">
import "cropperjs/dist/cropper.css"
import { computed, inject, reactive, watch } from "vue"
import { useRoute } from "vue-router"
import { key } from "./context/key"
//const VueCropper = defineAsyncComponent(() => import("vue-cropperjs"))

import PostLogic from "./postLogic.vue"
import TopNavigation from "./topNavigation.vue"
const route = useRoute()
const { formStep } = inject(key)!
interface State {
	open: boolean
	isDragging: boolean | null
	confirm: boolean
}

const state = reactive<State>({
	open: false,
	isDragging: null,
	confirm: false
})

const openConfirm = () => {
	if (state.open) state.confirm = true
}
const cancelConfirm = () => {
	state.confirm = false
}
const agreeConfirm = () => {
	state.confirm = false
	state.open = false
}
const openPopup = () => (state.open = true)

const isDraggingStyle = computed(() => ({
	pointerEvent: state.isDragging
		? "pointer-events-none"
		: "pointer-pointer-events-auto",
	open: state.open
		? "visible pointer-events-auto opacity-100 scale-100"
		: "invisble pointer-events-none opacity-0 scale-125 ",
	confirm: state.confirm
		? "visible pointer-events-auto opacity-100 scale-100"
		: "invisble pointer-events-none opacity-0 scale-125 z-0 "
}))
watch(
	() => route.params.id,
	() => {
		state.open = false
	}
)
//min-w-[calc(100vw-30px)]
</script>

<template>
	<font-awesome-icon
		tabindex="0"
		icon="fa-solid fa-square-plus"
		class="ml-6 h-6 w-6 cursor-pointer stroke-black stroke-[30px] text-white"
		@click.stop="openPopup"
		@keydown.enter="openPopup"
	/>
	<Teleport to="#modal">
		<div
			:class="[isDraggingStyle.open]"
			class="fixed top-0 left-0 z-10 h-full w-full bg-black bg-opacity-70 transition-all"
		>
			<div class="flex min-h-full items-center justify-center p-20">
				<font-awesome-icon
					icon="fa-solid fa-xmark"
					class="absolute top-2 right-2 h-5 w-5 text-white"
				/>
				<div
					v-click-outside="openConfirm"
					class="flex h-[calc(100vmin-229px)] max-h-[900px] scale-100 flex-col rounded bg-white"
					:class="
						formStep === 0 || formStep === 1
							? 'w-[calc(100vmin-229px)]'
							: ''
					"
				>
					<TopNavigation />
					<PostLogic />
				</div>
			</div>
		</div>
	</Teleport>
	<Teleport to="body">
		<div
			:class="[isDraggingStyle.confirm]"
			class="fixed top-0 left-0 z-[11] h-full w-full bg-black bg-opacity-70 transition-all"
		>
			<div class="flex min-h-full items-center justify-center p-20">
				<div class="w-full max-w-[500px] rounded bg-white text-center">
					<div class="p-5">
						<h4 class="font-bold">Discard post?</h4>
						<p class="text-xs text-gray-500">
							If you leave, your edits won't be saved.
						</p>
					</div>
					<button
						class="w-full border-t border-solid border-gray-300 py-2 font-medium text-red-500"
						@click="agreeConfirm"
					>
						Discard
					</button>
					<button
						class="w-full border-t border-gray-300 py-2"
						@click="cancelConfirm"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<style scoped></style>
