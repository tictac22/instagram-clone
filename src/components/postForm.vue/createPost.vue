<script setup lang="ts">
import Drag from "@/assets/drag.vue"
import "cropperjs/dist/cropper.css"
import { computed, defineAsyncComponent, reactive, ref } from "vue"
import IsLoading from "../isLoading.vue"
const VueCropper = defineAsyncComponent(() => import("vue-cropperjs"))
interface InputFileEvent extends Event {
	target: HTMLInputElement
}

interface State {
	open: boolean
	file: string | ArrayBuffer | null | undefined
	isDragging: boolean
}

const input = ref<HTMLInputElement | null>(null)
const cropper = ref<null | typeof VueCropper>(null)
const state = reactive<State>({
	open: true,
	file: "",
	isDragging: false
})

const handlePopup = () => {
	state.open = !state.open
}
const triggerInputFile = () => input.value!.click()

const uploadFileToCropper = (file: File) => {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = (event) => {
		state.file = event.target?.result
	}
}
const handleInputFile = (event: Event) => {
	const file = (event as InputFileEvent).target.files![0]
	uploadFileToCropper(file)
}
const dragOverFile = (event: Event) => (state.isDragging = true)
const dragLeave = () => (state.isDragging = false)
const dropFile = (event: Event) => {
	state.isDragging = false
	uploadFileToCropper(event.dataTransfer.files[0])
}

const croppedImage = () => {
	const canvas = cropper.value!.getCroppedCanvas()
	console.log(canvas.toDataURL())
}

const isDraggingStyle = computed(() => ({
	pointerEvents: state.isDragging
		? "pointer-events-none"
		: "pointer-events-auto",
	background: state.isDragging ? "bg-[rgb(250,250,250)]" : "bg-white",
	textColor: state.isDragging ? "text-blue-500" : ""
}))
</script>

<template>
	<font-awesome-icon
		icon="fa-solid fa-square-plus"
		class="w-6 h-6 ml-6 text-white stroke-black stroke-[30px]"
		@click.stop="handlePopup"
	/>
	<Teleport to="body">
		<div
			:class="[
				state.open
					? 'visible pointer-events-auto opacity-100 scale-100'
					: 'invisble pointer-events-none opacity-0 scale-125'
			]"
			class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center transition-all"
		>
			<font-awesome-icon
				icon="fa-solid fa-xmark"
				class="text-white absolute top-2 right-2 w-5 h-5"
			/>
			<div
				class="bg-white scale-100 rounded h-[calc(100vmin-229px)] w-[calc(100vmin-229px)] max-h-[900px] max-w-[900px]"
				v-click-outside="handlePopup"
			>
				<div
					class="flex items-center justify-center m-auto py-2 border-b border-[#DBDBDB]"
				>
					<h3 v-on:click="croppedImage" class="font-medium">
						Create new post
					</h3>
				</div>
				<div
					:draggable="true"
					v-on:dragstart.prevent="dragOverFile"
					v-on:dragover.prevent="dragOverFile"
					v-on:drop.prevent="dropFile"
					v-on:dragleave.prevent="dragLeave"
					class="h-full flex justify-center"
					:class="[isDraggingStyle.background]"
				>
					<div
						v-if="!state.file"
						class="flex items-center justify-center flex-col"
						:class="[isDraggingStyle.pointerEvents]"
					>
						<Drag :class="[isDraggingStyle.textColor]" />
						<p class="text-xl font-light text-[rgb(38,38,38)]">
							Drag photos and videos here
						</p>
						<button
							class="bg-blue-500 text-white p-1 px-2 rounded mt-3"
							v-on:click="triggerInputFile"
						>
							Select from computer
						</button>
						<input
							ref="input"
							type="file"
							class="hidden"
							v-on:change="handleInputFile"
							accept=".jpg,.jpeg,.png"
						/>
					</div>
					<template v-else>
						<Suspense>
							<VueCropper
								ref="cropper"
								:src="state.file"
								:viewMode="3"
								:autoCropArea="1"
								:center="false"
								class="h-full"
							/>
							<template #fallback>
								<div class="flex items-center">
									<IsLoading />
								</div>
							</template>
						</Suspense>
					</template>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<style scoped></style>