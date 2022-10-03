<script setup lang="ts">
import { provide, ref } from "vue"

import { key } from "./key"

const files = ref<string[]>([])
const croppedFiles = ref<string[]>([])
const formStep = ref(1)
const nextFormStep = () => formStep.value++
const prevFormStep = () => formStep.value--

const saveCropImages = (croppedImages: string[]) => {
	croppedFiles.value = croppedImages
}
const uploadFileToCropper = (file: File) => {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = (event) => {
		files.value.push(event.target?.result as string)
	}
}

const deleteFile = async (index: number) => {
	files.value.splice(index, 1)
	if (currentSlider.value > 0) {
		currentSlider.value--
	}
}
const swapFiles = (from: number, to: number) => {
	setSlider(to)
	files.value.splice(from, 1, files.value.splice(to, 1, files.value[from])[0])
}
const currentSlider = ref(0)
const nextSlider = () => currentSlider.value++
const prevSlider = () => currentSlider.value--
const setSlider = (index: number) => (currentSlider.value = index)

provide(key, {
	currentSlider,
	nextSlider,
	prevSlider,
	setSlider,
	files,
	uploadFileToCropper,
	swapFiles,
	deleteFile,
	formStep,
	saveCropImages,
	nextFormStep,
	prevFormStep
})
</script>

<template>
	<slot></slot>
</template>
