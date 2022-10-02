<script setup lang="ts">
import { provide, ref } from "vue"

import { key } from "./key"

const files = ref<string[]>([])
const uploadFileToCropper = (file: File) => {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = (event) => {
		console.log(file)
		files.value.push(event.target?.result as string)
	}
}

const deleteFile = async (index: number) => {
	console.log(currentSlider.value)
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
	deleteFile
})
</script>

<template>
	<slot></slot>
</template>
