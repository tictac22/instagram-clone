<script setup lang="ts">
import "cropperjs/dist/cropper.css"
import { inject, ref } from "vue"
import VueCropper from "vue-cropperjs"
import { key } from "../context/key"
import CropperNavigation from "./cropperNavigation.vue"
import DragFile from "./dragFile.vue"
import Navigation from "./navigation.vue"

const { files, currentSlider } = inject(key)!
const cropperRef = ref<null | typeof VueCropper[]>(null)
</script>
<template>
	<div class="flex-auto relative rounded h-full">
		<DragFile v-if="files.length === 0" />
		<template v-else>
			<CropperNavigation />
			<Navigation />
			<div class="overflow-hidden h-full relative">
				<VueCropper
					v-for="(image, index) in files"
					ref="cropperRef"
					:src="image"
					:key="image"
					:viewMode="3"
					:autoCropArea="1"
					:center="false"
					class="h-[calc(100vmin-270px)] absolute inset-0 w-full"
					:class="[currentSlider === index ? 'z-[2]' : 'z-0']"
				/>
			</div>
		</template>
	</div>
</template>
