<script setup lang="ts">
import { inject } from "vue"
import { key } from "../context/key"
import DescriptionNavigation from "./descriptionNavigation.vue"
import DescriptionText from "./descriptionText.vue"
import { key as keyD } from "./key"

const { blobedFiles } = inject(key)!
const { currentImage } = inject(keyD)!
</script>

<template>
	<div
		class="relative flex h-full w-full items-center justify-end overflow-hidden"
	>
		<div class="relative h-full w-[631px]">
			<img
				v-for="(file, index) in blobedFiles"
				:key="file"
				ref="canvas"
				class="absolute h-full w-full"
				:class="currentImage === index ? 'z-10' : 'z-0 opacity-0'"
				:src="file"
			/>
			<DescriptionNavigation />
		</div>
		<DescriptionText />
	</div>
</template>
