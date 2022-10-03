<script setup lang="ts">
import "cropperjs/dist/cropper.css"
import { inject } from "vue"
import VueCropper from "vue-cropperjs"
import { key } from "../context/key"

const { currentSlider } = inject(key)!

const props = defineProps<{
	images: string[]
}>()
</script>

<template>
	<div class="flex overflow-hidden">
		<VueCropper
			v-for="(image, index) in props.images"
			v-show="currentSlider === index"
			:key="image"
			ref="cropperRef"
			:src="image"
			:viewMode="3"
			:autoCropArea="1"
			:center="false"
			class="h-full"
		/>
	</div>
</template>
