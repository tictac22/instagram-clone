<script setup lang="ts">
import { inject, onMounted, ref, watch } from "vue"
import { key } from "../context/key"
import FilterNavigation from "./filterNavigation.vue"
import { key as keyF } from "./key"

const imageFilters: { [key: string]: string } = {
	original: "",
	aden: "contrast(90%) brightness(120%) saturate(85%) hue-rotate(20deg)",
	clarendom: "contrast(120%) brightness(100%) saturate(125%)",
	crema: "contrast(90%) brightness(110%) saturate(100%)",
	gingham:
		"contrast(100%) brightness(105%) saturate(100%) hue-rotate(350deg)",
	juno: "contrast(108%) brightness(108%) saturate(100%) sepia(8%)",
	lark: "contrast(90%) brightness(120%) saturate(110%)",
	ludwig: "contrast(75%) brightness(115%) saturate(85%)",
	moon: "brightness(140%) contrast(95%) saturate(0) sepia(35%)",
	perpetua: "contrast(110%) brightness(125%) saturate(110%)",
	reyes: "contrast(85%) brightness(110%) saturate(75%) sepia(22%)",
	slumber: "contrast(150%) brightness(100%) saturate(110%)"
}

const {
	croppedFiles,
	saveBlobedFiles,
	selectedFilter,
	saveSelectedFilters,
	filterErrors
} = inject(key)!

const { currentImage } = inject(keyF)!

const canvas = ref<HTMLCanvasElement[] | null>(null)
const htmlImages = ref<HtmlImage>({})
const renderCanvas = (
	index: number,
	image: HTMLImageElement,
	filter: string = ""
) => {
	const ctx = canvas.value![index].getContext("2d")!
	canvas.value![index].width = image.width
	canvas.value![index].height = image.height

	ctx.filter = filter
	ctx.drawImage(image, 0, 0)
	htmlImages.value![index] = image
}

interface HtmlImage {
	[key: number]: HTMLImageElement
}

const setFilter = (filter: string, index: number) => {
	saveSelectedFilters(index, filter)
	renderCanvas(index, htmlImages.value![index], imageFilters[filter])
}

watch(
	() => selectedFilter,
	() => {
		const images: string[] = []

		canvas.value!.map((item, index, array) => {
			item.toBlob(blob => {
				const url = URL.createObjectURL(blob!)
				images.push(url)
				if (array.length === index + 1) {
					saveBlobedFiles(images)
				}
			})
		})
	},
	{ deep: true }
)
onMounted(() => {
	canvas.value!?.forEach((item, index) => {
		new Promise(resolve => {
			const image = new Image()

			image.onload = function () {
				renderCanvas(
					index,
					image,
					imageFilters[selectedFilter.value[index]]
				)

				resolve("")
			}
			image.src = croppedFiles.value[index]
		})
	})
})
const capitalizeFirstLetter = (string: string) =>
	string.charAt(0).toUpperCase() + string.slice(1)
</script>

<template>
	<div
		class="relative flex h-full w-full items-center justify-end overflow-hidden"
	>
		<div class="relative h-full w-[300px] lg:w-[600px]">
			<canvas
				v-for="(file, index) in croppedFiles"
				:key="file"
				ref="canvas"
				class="absolute h-full w-full"
				:class="currentImage === index ? 'z-10' : 'z-0 opacity-0'"
			>
			</canvas>

			<FilterNavigation />
		</div>
		<div class="relative z-50 h-full w-[340px] bg-white">
			<div class="flex items-center justify-center">
				<p
					class="flex-[100%] cursor-pointer border-b border-solid border-black py-4 text-center"
				>
					Filters
				</p>
			</div>
			<div
				class="m-2 grid grid-cols-3 justify-items-center gap-x-4 gap-y-4"
			>
				<div
					v-for="image in Object.keys(imageFilters)"
					:key="image"
					class="text-center"
				>
					<div
						class="h-[88px] w-[88px] cursor-pointer overflow-hidden rounded-md border-2 border-solid text-center"
						:class="[
							image === selectedFilter[currentImage]
								? 'border-[rgb(0,149,246)]'
								: 'border-white'
						]"
						@click="setFilter(image, currentImage)"
					>
						<img
							:src="`./filters/${image}.jpg`"
							alt="image"
							class="h-[99px] w-[99px] rounded-md object-cover"
						/>
					</div>
					<p
						class="text-[13px] font-medium"
						:class="[
							image === selectedFilter[currentImage]
								? 'text-[rgb(0,149,246)]'
								: ''
						]"
					>
						{{ capitalizeFirstLetter(image) }}
					</p>
				</div>
			</div>
			<p v-if="filterErrors" class="ml-4 font-medium text-red-500">
				Please select filters for your images
			</p>
		</div>
	</div>
</template>
