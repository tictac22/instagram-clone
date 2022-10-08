<script setup lang="ts">
import { inject } from "vue"
import { key } from "../context/key"
import DescriptionNavigation from "./descriptionNavigation.vue"

const { blobedFiles } = inject(key)!
</script>

<template>
	<div
		class="relative flex h-full w-full items-center justify-end overflow-hidden"
	>
		<div class="relative h-full w-[300px] lg:w-[600px]">
			<img
				v-for="file in blobedFiles"
				:key="file"
				ref="canvas"
				class="absolute h-full w-full"
				:src="file"
			/>
			<DescriptionNavigation />
		</div>
	</div>
</template>
