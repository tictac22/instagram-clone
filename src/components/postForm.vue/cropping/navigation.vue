<script setup lang="ts">
import AddImage from "@/assets/addImage.vue"
import OpenGallery from "@/assets/openGallery.vue"
import "cropperjs/dist/cropper.css"
import { inject } from "vue"
import { key } from "../context/key"
import ImageSlider from "./imageSlider.vue"
interface InputFileEvent extends Event {
	target: HTMLInputElement
}

const { uploadFileToCropper } = inject(key)!

const handleInputFile = (event: Event) => {
	const target = (event as InputFileEvent).target
	const file = target.files![0]
	uploadFileToCropper(file)
	target.value = ""
}
</script>
<template>
	<div class="absolute right-0 bottom-0 w-full z-10">
		<div class="flex flex-col items-end p-4">
			<button
				class="bg-black mt-3 rounded-full order-1 flex w-8 h-8 items-center justify-center hover:opacity-70 cursor-pointer transition-opacity"
			>
				<OpenGallery />
			</button>
			<div class="p-2 max-w-full flex bg-[#2c3733] rounded">
				<ImageSlider />
				<AddImage :handleInputFile="handleInputFile" />
			</div>
		</div>
	</div>
</template>
