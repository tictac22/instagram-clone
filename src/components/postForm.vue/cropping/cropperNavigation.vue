<script setup lang="ts">
import { computed, inject } from "vue"
import { key } from "../context/key"
import { key as keyC } from "./key"
import Slider from "./slider/slider.vue"

const { files } = inject(key)!

const { currentImage, nextCurrentImage, prevCurrentImage } = inject(keyC)!
const showPrevButton = computed(
	() => currentImage.value > 0 && files.value.length > 0
)
const showNextButton = computed(
	() => currentImage.value !== files.value.length - 1 && files
)
</script>

<template>
	<div
		v-if="showPrevButton"
		class="absolute top-1/2 left-[10px] z-20 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black text-lg text-white"
		@click="prevCurrentImage"
	>
		<font-awesome-icon
			class="text-[12px]"
			icon="fa-solid fa-chevron-left"
		/>
	</div>
	<div
		v-if="showNextButton"
		class="absolute top-1/2 right-[10px] z-20 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black text-lg text-white"
		@click="nextCurrentImage"
	>
		<font-awesome-icon
			class="text-[12px]"
			icon="fa-solid fa-chevron-right"
		/>
	</div>
	<div
		v-if="files.length > 1"
		class="absolute left-1/2 bottom-3 z-30 flex -translate-x-1/2"
	>
		<div
			v-for="(item, index) in files"
			:key="item"
			class="mx-1 h-2 w-2 rounded-full"
			:class="currentImage === index ? 'bg-blue-500' : 'bg-gray-500'"
		></div>
	</div>
	<Slider />
</template>
