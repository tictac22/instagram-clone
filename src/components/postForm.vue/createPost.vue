<script setup lang="ts">
import "cropperjs/dist/cropper.css"
import { computed, onUpdated, provide, reactive, ref } from "vue"
import VueCropper from "vue-cropperjs"
import CropperNavigation from "./cropperNavigation.vue"
import DragFile from "./dragFile.vue"
import Navigation from "./navigation.vue"
//const VueCropper = defineAsyncComponent(() => import("vue-cropperjs"))

import { key } from "./key"
const currentSlider = ref(0)
const nextSlider = () => {
	currentSlider.value++
}
const prevSlider = () => {
	currentSlider.value--
}
const setSlider = (index: number) => {
	currentSlider.value = index
}

provide(key, {
	currentSlider,
	nextSlider,
	prevSlider,
	setSlider
})

interface InputFileEvent extends Event {
	target: HTMLInputElement
}

interface State {
	open: boolean
	files: string[]
	isDragging: boolean | null
}

const cropperRef = ref<null | typeof VueCropper[]>(null)
const state = reactive<State>({
	open: true,
	files: [],
	isDragging: null
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
		: "invisble pointer-events-none opacity-0 scale-125 "
}))
const swapFiles = (from: number, to: number) => {
	setSlider(to)
	state.files.splice(from, 1, state.files.splice(to, 1, state.files[from])[0])
}

const test = () => {
	//const canvas = cropperRef.value.getCroppedCanvas()
	console.log("test")
}
onUpdated(() => {
	console.log(cropperRef.value)
})
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
						<h3 class="font-medium">Create new post</h3>
					</div>
					<div class="flex-auto relative rounded h-full">
						<DragFile
							v-if="state.files.length === 0"
							:handleInputFile="handleInputFile"
							:uploadFileToCropper="uploadFileToCropper"
						/>
						<template v-else>
							<CropperNavigation
								:imagesLength="state.files.length"
							/>
							<Navigation
								:handleInputFile="handleInputFile"
								:images="state.files"
								:swap-files="swapFiles"
							/>
							<div class="overflow-hidden h-full relative">
								<VueCropper
									v-for="(images, index) in state.files"
									ref="cropperRef"
									:src="images"
									:viewMode="3"
									:autoCropArea="1"
									:center="false"
									:alt="index"
									class="h-[calc(100vmin-270px)] absolute inset-0 w-full"
									:class="[
										currentSlider === index
											? 'z-[2]'
											: 'z-0'
									]"
									@cropend="test"
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
