<script setup lang="ts">
import { computed, inject } from "vue"
import { key } from "../context/key"

const { files } = inject(key)!

const { prevSlider, currentSlider, nextSlider } = inject(key)!
const showPrevButton = computed(
	() => currentSlider.value > 0 && files.value.length > 0
)
const showNextButton = computed(
	() => currentSlider.value !== files.value.length - 1 && files
)
</script>

<template>
	<div
		@click="prevSlider"
		v-if="showPrevButton"
		class="w-5 h-5 -translate-y-1/2 z-20 cursor-pointer text-white text-lg rounded-full bg-black absolute top-1/2 left-[10px] flex items-center justify-center"
	>
		<font-awesome-icon
			class="text-[12px]"
			icon="fa-solid fa-chevron-left"
		/>
	</div>
	<div
		v-if="showNextButton"
		@click="nextSlider"
		class="w-5 h-5 -translate-y-1/2 z-20 cursor-pointer text-white text-lg rounded-full bg-black absolute top-1/2 right-[10px] flex items-center justify-center"
	>
		<font-awesome-icon
			class="text-[12px]"
			icon="fa-solid fa-chevron-right"
		/>
	</div>
	<div class="flex absolute left-1/2 bottom-3 z-30 -translate-x-1/2">
		<div
			class="w-2 h-2 rounded-full mx-1"
			v-for="(item, index) in files"
			:class="currentSlider === index ? 'bg-blue-500' : 'bg-gray-500'"
		></div>
	</div>
</template>
