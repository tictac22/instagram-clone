<script setup lang="ts">
import { inject, onMounted, ref } from "vue"
import { key } from "../context/key"
import FilterNavigation from "./filterNavigation.vue"
import { key as keyF } from "./key"

const { croppedFiles } = inject(key)!

const { currentImage } = inject(keyF)!

const canvas = ref<HTMLCanvasElement[] | null>(null)

const renderCanvas = (index: number, image: HTMLImageElement) => {
	const ctx = canvas.value![index].getContext("2d")!
	canvas.value![index].width = image.width
	canvas.value![index].height = image.height

	ctx.filter = ""
	ctx.drawImage(image, 0, 0)
}
onMounted(() => {
	canvas.value!.forEach((item, index) => {
		new Promise(resolve => {
			const image = new Image()

			image.onload = function () {
				renderCanvas(index, image)
				resolve("")
			}
			image.src = croppedFiles.value[index]
		})
	})
})
const imageFilterNames = [
	"aden",
	"clarendom",
	"crema",
	"gingham",
	"juno",
	"lark",
	"ludwig",
	"moon",
	"perpetua",
	"reyes",
	"slumber"
]
</script>

<template>
	<div
		class="relative flex h-full w-full items-center justify-end overflow-hidden"
	>
		<div class="relative h-full w-[calc(100%-340px)]">
			<canvas
				v-for="(file, index) in croppedFiles"
				:key="file"
				ref="canvas"
				class="absolute top-0 left-0 h-full w-full"
				:class="currentImage === index ? 'z-10' : 'z-0 opacity-0'"
			>
			</canvas>

			<FilterNavigation />
		</div>
		<div class="relative z-50 h-full w-[340px] bg-white">
			<div class="flex items-center justify-center">
				<p
					class="flex-[50%] cursor-pointer border-b border-solid border-black py-4 text-center"
				>
					Filters
				</p>
				<p
					class="flex-[50%] cursor-pointer border-b border-solid border-[rgb(38,38,38)] py-4 text-center opacity-[0.3]"
				>
					Adjustments
				</p>
			</div>
			<div
				class="m-2 grid grid-cols-3 justify-items-center gap-x-4 gap-y-4"
			>
				<div
					v-for="image in imageFilterNames"
					:key="image"
					class="text-center"
				>
					<div
						class="h-[88px] w-[88px] overflow-hidden rounded-md border border-solid border-[rgb(0,149,246)] text-center"
					>
						<img
							:src="`./filters/${image}.jpg`"
							alt="image"
							class="h-[99px] w-[99px] rounded-md object-cover"
						/>
					</div>
					<p class="text-[13px] text-[rgb(0,149,246)]">{{ image }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
