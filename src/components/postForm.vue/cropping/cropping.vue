<script setup lang="ts">
import "cropperjs/dist/cropper.css"
import { inject, ref, watch } from "vue"
import VueCropper from "vue-cropperjs"
import { key } from "../context/key"
import CropperNavigation from "./cropperNavigation.vue"
import DragFile from "./dragFile.vue"
import Navigation from "./navigation.vue"

const { files, formStep, currentSlider, saveCropImages } = inject(key)!
const cropperRef = ref<null | typeof VueCropper[]>(null)

watch(formStep, () => {
	if (formStep.value === 2) {
		const images = []
		cropperRef.value?.map((item) => {
			new Promise((resolve, reject) => {
				const canvas = item.getCroppedCanvas().toDataURL()
				const img = new Image()
				img.onload = function () {
					images.push(img.src)
					resolve()
				}
				img.src = canvas
			})
		})
		saveCropImages(images)
	}
})
</script>
<template>
	<div class="relative h-full flex-auto rounded">
		<div class="relative h-full flex-auto rounded">
			<DragFile v-if="files.length === 0" />
			<template v-else>
				<CropperNavigation />
				<Navigation />
				<div class="relative h-full overflow-hidden">
					<VueCropper
						v-for="(image, index) in files"
						:key="image"
						ref="cropperRef"
						:viewMode="3"
						class="absolute inset-0 h-[calc(100vmin-270px)] w-full"
						:autoCropArea="1"
						:src="image"
						:center="false"
						:class="[currentSlider === index ? 'z-[2]' : 'z-0']"
					/>
				</div>
			</template>
		</div>
	</div>
</template>
