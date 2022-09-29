<script setup lang="ts">
import AddImage from "@/assets/addImage.vue"
import Drag from "@/assets/drag.vue"
import OpenGallery from "@/assets/openGallery.vue"
import "cropperjs/dist/cropper.css"
import { computed, reactive, ref } from "vue"
import VueCropper from "vue-cropperjs"
//const VueCropper = defineAsyncComponent(() => import("vue-cropperjs"))
interface InputFileEvent extends Event {
	target: HTMLInputElement
}

interface State {
	open: boolean
	files: string[]
	isDragging: boolean | null
	currentSlider: number
}

const input = ref<HTMLInputElement | null>(null)
const croppersRefs = ref<null | typeof VueCropper[]>([])
const state = reactive<State>({
	open: true,
	files: [],
	isDragging: null,
	currentSlider: 0
})

const closePopup = () => (state.open = false)
const openPopup = () => (state.open = true)
const triggerInputFile = () => input.value!.click()

const uploadFileToCropper = (file: File) => {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = (event) => {
		state.files.push(event.target?.result as string)
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
	pointerEvent: state.isDragging
		? "pointer-events-none"
		: "pointer-pointer-events-auto",
	open: state.open
		? "visible pointer-events-auto opacity-100 scale-100"
		: "invisble pointer-events-none opacity-0 scale-125 ",

	background: state.isDragging ? "bg-[rgb(250,250,250)]" : "bg-white",
	textColor: state.isDragging ? "text-blue-500" : ""
}))
const nextCropperSLide = () => state.currentSlider++
</script>

<template>
	<font-awesome-icon
		icon="fa-solid fa-square-plus"
		class="w-6 h-6 ml-6 text-white stroke-black stroke-[30px]"
		@click.stop="openPopup"
	/>
	<Teleport to="#modal">
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
					class="bg-white scale-100 rounded h-[calc(100vmin-229px)] w-[calc(100vmin-229px)] max-h-[900px] max-w-[900px] flex flex-col"
					v-click-outside="closePopup"
				>
					<div
						class="flex items-center justify-center py-2 border-b border-[#DBDBDB]"
					>
						<h3 v-on:click="nextCropperSLide" class="font-medium">
							Create new post
						</h3>
					</div>
					<div
						:draggable="croppersRefs!.length === 0"
						v-on:dragstart.prevent="() => {}"
						v-on:dragover.prevent="dragOverFile"
						v-on:drop.prevent="dropFile"
						v-on:dragleave.prevent="dragLeave"
						class="flex justify-center flex-auto relative rounded"
						:class="[isDraggingStyle.background]"
					>
						<div class="absolute right-2 bottom-2 z-10">
							<button
								class="bg-black rounded-full flex w-8 h-8 items-center justify-center hover:opacity-70 cursor-pointer transition-opacity"
							>
								<OpenGallery />
							</button>
							<div
								class="p-2 flex bg-[#2c3733] rounded absolute right-2 bottom-10"
							>
								<div
									class="mx-1 w-[94px] h-[94px]"
									v-for="file in state.files"
								>
									<img
										class="w-full h-full object-cover"
										:src="file"
									/>
								</div>
								<AddImage :handleInputFile="handleInputFile" />
							</div>
						</div>
						<div
							v-if="state.files.length === 0"
							class="flex items-center justify-center flex-col"
							:class="[isDraggingStyle.pointerEvent]"
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
							<div
								class="flex items-center overflow-hidden"
								v-for="(file, index) in state.files"
							>
								<VueCropper
									ref="croppersRefs"
									:src="file"
									:viewMode="3"
									:autoCropArea="1"
									:center="false"
									class="w-[calc(100vmin-229px)] h-[calc(100vmin-270px)] items-center justify-center overflow-hidden"
									v-if="state.currentSlider === index"
								/>
							</div>
						</template>
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<style scoped></style>
