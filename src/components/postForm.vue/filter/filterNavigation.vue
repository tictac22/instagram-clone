<script setup lang="ts">
import { computed, inject } from "vue"
import { key } from "../context/key"
import { key as keyF } from "./key"

const { croppedFiles } = inject(key)!

const { nextCurrentImage, prevCurrentImage, currentImage } = inject(keyF)!

const showPrevButton = computed(
	() => currentImage.value > 0 && croppedFiles.value.length > 0
)
const showNextButton = computed(
	() => currentImage.value !== croppedFiles.value.length - 1 && croppedFiles
)
</script>

<template>
	<div class="absolute inset-0 z-20 flex items-center justify-center">
		<div
			v-if="showPrevButton"
			class="absolute top-1/2 left-[10px] z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black text-lg text-white hover:opacity-50"
			style="-webkit-box-shadow: 0 4px 12px rgb(0 0 0 / 15%)"
			@click="prevCurrentImage"
		>
			<font-awesome-icon
				class="text-[12px]"
				icon="fa-solid fa-chevron-left"
			/>
		</div>
		<div
			v-if="showNextButton"
			class="absolute top-1/2 right-[10px] z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black text-lg text-white hover:opacity-50"
			style="-webkit-box-shadow: 0 4px 12px rgb(0 0 0 / 15%)"
			@click="nextCurrentImage"
		>
			<font-awesome-icon
				class="text-[12px]"
				icon="fa-solid fa-chevron-right"
			/>
		</div>
		<div class="absolute left-1/2 bottom-3 z-30 flex -translate-x-1/2">
			<div
				v-for="(item, index) in croppedFiles"
				:key="item"
				class="mx-1 h-2 w-2 rounded-full"
				:class="currentImage === index ? 'bg-blue-500' : 'bg-gray-500'"
			></div>
		</div>
	</div>
</template>
