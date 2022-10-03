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
	<div class="absolute right-0 bottom-0 z-10 w-full">
		<div class="flex flex-col items-end p-4">
			<button
				class="order-1 mt-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black transition-opacity hover:opacity-70"
			>
				<OpenGallery />
			</button>
			<div class="flex max-w-full rounded bg-[#2c3733] p-2">
				<ImageSlider />
				<AddImage :handleInputFile="handleInputFile" />
			</div>
		</div>
	</div>
</template>
