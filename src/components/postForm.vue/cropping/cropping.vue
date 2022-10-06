<script setup lang="ts">
import "cropperjs/dist/cropper.css"
import { inject, ref, watch } from "vue"
import VueCropper from "vue-cropperjs"
import { key } from "../context/key"
import CropperNavigation from "./cropperNavigation.vue"
import Navigation from "./navigation.vue"

const { files, formStep, currentSlider, saveCropImages } = inject(key)!
const cropperRefs = ref<null | typeof VueCropper[]>([])
watch(formStep, value => {
	if (value === 2) {
		const images: string[] = []
		cropperRefs.value?.map(item => {
			new Promise(resolve => {
				const canvas = item.getCroppedCanvas().toDataURL() as string
				images.push(canvas)
				resolve("")
			})
		})
		saveCropImages(images)
	}
})
</script>
<template>
	<div class="relative h-full flex-auto rounded">
		<div class="relative h-full flex-auto rounded">
			<CropperNavigation />
			<Navigation />
			<div class="relative h-full overflow-hidden">
				<VueCropper
					v-for="(image, index) in files"
					:key="image"
					ref="cropperRefs"
					:viewMode="3"
					class="absolute inset-0 h-[calc(100vmin-270px)] w-full"
					:autoCropArea="1"
					:src="image"
					:center="false"
					:class="[currentSlider === index ? 'z-[2]' : 'z-0']"
				/>
			</div>
		</div>
	</div>
</template>
