<script setup lang="ts">
import AddImage from "@/assets/addImage.vue"
import OpenGallery from "@/assets/openGallery.vue"
import "cropperjs/dist/cropper.css"
import { computed, reactive, ref } from "vue"
import VueCropper from "vue-cropperjs"
import DragFile from "./dragFile.vue"
import ImageSlider from "./imageSlider.vue"
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

const cropperRef = ref<null | typeof VueCropper>(null)
const currentSlider = ref(0)
const state = reactive<State>({
	open: true,
	files: [],
	isDragging: null,
	currentSlider: 0
})

const closePopup = () => (state.open = false)
const openPopup = () => (state.open = true)

const uploadFileToCropper = (file: File) => {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = (event) => {
		state.files.push(event.target?.result as string)
	}
}
const handleInputFile = (event: Event) => {
	const target = (event as InputFileEvent).target
	const file = target.files![0]
	uploadFileToCropper(file)
	target.value = ""
}

const isDraggingStyle = computed(() => ({
	pointerEvent: state.isDragging
		? "pointer-events-none"
		: "pointer-pointer-events-auto",
	open: state.open
		? "visible pointer-events-auto opacity-100 scale-100"
		: "invisble pointer-events-none opacity-0 scale-125 ",

	background: state.isDragging ? "bg-[rgb(250,250,250)]" : "bg-white",
	textColor: state.isDragging ? "text-blue-500" : "text-black"
}))
const nextCropperImage = () => {
	currentSlider.value++
	cropperRef.value.replace(state.files[currentSlider.value])
}
const prevCropperImage = () => {
	currentSlider.value--
	cropperRef.value.replace(state.files[currentSlider.value])
}

const test = () => {
	const canvas = cropperRef.value.getCroppedCanvas()
	console.log(canvas)
}
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
						<h3 class="font-medium" v-on:click="nextCropperImage">
							Create new post
						</h3>
					</div>
					<div
						class="flex justify-center flex-auto relative rounded h-full"
						:class="[isDraggingStyle.background]"
					>
						<div
							v-if="state.files.length > 0"
							class="absolute right-0 bottom-0 w-full z-10"
						>
							<div class="flex flex-col items-end p-4">
								<button
									v-on:click="prevCropperImage"
									class="bg-black mt-3 rounded-full order-1 flex w-8 h-8 items-center justify-center hover:opacity-70 cursor-pointer transition-opacity"
								>
									<OpenGallery />
								</button>
								<div
									class="p-2 max-w-full flex bg-[#2c3733] rounded"
								>
									<ImageSlider />
									<AddImage
										:handleInputFile="handleInputFile"
									/>
								</div>
							</div>
						</div>
						<DragFile
							v-if="state.files.length === 0"
							:handleInputFile="handleInputFile"
							:uploadFileToCropper="uploadFileToCropper"
						/>
						<template v-else>
							<VueCropper
								ref="cropperRef"
								:src="state.files[0]"
								:viewMode="3"
								:autoCropArea="1"
								:center="false"
								class="items-center justify-center overflow-hidden"
								@cropend="test"
							/>
						</template>
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<style scoped></style>
