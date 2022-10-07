<script setup lang="ts">
import OpenGallery from "@/assets/openGallery.vue"
import "cropperjs/dist/cropper.css"
import { defineAsyncComponent, ref } from "vue"

const AsyncSliderLogic = defineAsyncComponent(() => import("./sliderLogic.vue"))
const show = ref(false)
const openSlider = () => (show.value = true)
const closeSlider = () => (show.value = false)
</script>
<template>
	<div class="absolute right-0 bottom-0 z-10">
		<div class="flex flex-col items-end p-4">
			<button
				class="order-1 mt-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black transition-opacity hover:opacity-70"
				@click.prevent="openSlider"
			>
				<OpenGallery />
			</button>
			<AsyncSliderLogic
				v-if="show"
				v-click-outside.prevent="closeSlider"
			/>
		</div>
	</div>
</template>
