<script setup lang="ts">
import "cropperjs/dist/cropper.css"
import { inject } from "vue"
import VueCropper from "vue-cropperjs"
import { key } from "./context/key"

const { currentSlider } = inject(key)!

const props = defineProps<{
	images: string[]
}>()
</script>

<template>
	<div class="flex overflow-hidden">
		<VueCropper
			v-for="(images, index) in props.images"
			ref="cropperRef"
			:src="images"
			:viewMode="3"
			:autoCropArea="1"
			:center="false"
			class="h-full"
			v-show="currentSlider === index"
		/>
	</div>
</template>
