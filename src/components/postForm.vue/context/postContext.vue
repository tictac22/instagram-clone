<script setup lang="ts">
import { provide, ref } from "vue"

import CreatePost from "../createPost.vue"
import { key } from "./key"

const formStep = ref(0)
const nextFormStep = () => {
	if (
		formStep.value === 2 &&
		Object.keys(selectedFilter.value).length === 0
	) {
		filterErrors.value = true
		return
	}
	formStep.value++
}
const prevFormStep = () => formStep.value--

const files = ref<string[]>([])
const uploadFileToCropper = (file: File) => {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = event => {
		files.value.push(event.target?.result as string)
	}
}

const deleteFile = async (index: number) => {
	files.value.splice(index, 1)
	if (files.value.length === 0) {
		formStep.value = 0
	}
}
const swapFiles = (from: number, to: number) => {
	files.value.splice(from, 1, files.value.splice(to, 1, files.value[from])[0])
}

const croppedFiles = ref<string[]>([])

const saveCropImages = (croppedImages: string[]) => {
	croppedFiles.value = croppedImages
}
const blobedFiles = ref<string[]>([])
interface Filter {
	[key: number]: string
}
const selectedFilter = ref<Filter>({})
const filterErrors = ref(false)
const saveSelectedFilters = (index: number, filter: string) => {
	selectedFilter.value = { ...selectedFilter.value, [index]: filter }
	filterErrors.value = false
}
const saveBlobedFiles = (files: string[]) => (blobedFiles.value = [...files])

provide(key, {
	files,
	croppedFiles,
	uploadFileToCropper,
	blobedFiles,
	swapFiles,
	deleteFile,
	formStep,
	saveCropImages,
	nextFormStep,
	prevFormStep,
	saveBlobedFiles,
	selectedFilter,
	filterErrors,
	saveSelectedFilters
})
</script>

<template>
	<CreatePost />
</template>
