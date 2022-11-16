<script setup lang="ts">
import "cropperjs/dist/cropper.css"
import { inject, ref, watch } from "vue"
import VueCropper from "vue-cropperjs"
import { key } from "../context/key"
import CropperNavigation from "./cropperNavigation.vue"
import { key as keyC } from "./key"

const { files, formStep, saveCropImages } = inject(key)!
const { currentImage } = inject(keyC)!
const cropperRefs = ref<null | typeof VueCropper[]>([])
watch(formStep, value => {
	if (value !== 2) return
	const images: string[] = []
	cropperRefs.value?.map(item => {
		console.log(item, "croppped")
		new Promise(resolve => {
			const canvas = item.getCroppedCanvas().toDataURL() as string
			images.push(canvas)
			resolve("")
		})
	})
	saveCropImages(images)
})
</script>
<template>
	<div class="relative h-full flex-auto rounded">
		<div class="relative h-full flex-auto rounded">
			<CropperNavigation />
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
					:class="[currentImage === index ? 'z-[2]' : 'z-0']"
				/>
			</div>
		</div>
	</div>
</template>
