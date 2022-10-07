<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted, onUpdated, ref } from "vue"
import { key } from "../../context/key"
import { key as keyC } from "../key"
const { files, swapFiles, deleteFile: deleteContextFile } = inject(key)!

const { setCurrentImage, prevCurrentImage, currentImage } = inject(keyC)!
const currentDrag = ref<null | number>(null)
const dragStart = (event: Event, index: number) => {
	currentDrag.value = index
}

const deleteFile = (index: number) => {
	deleteContextFile(index)
	if (currentImage.value !== 0) {
		prevCurrentImage()
	}
}
const dragDrop = (event: Event, index: number) => {
	swapFiles(currentDrag.value!, index)
	currentDrag.value = null
	setCurrentImage(currentDrag.value!)
}

const position = ref(0)
const slidesToShow = ref(0)
const containter = ref<HTMLDivElement | null>(null)

const trackRef = ref<HTMLDivElement | null>(null)
const btnPrev = () => {
	const movePosition = 2 * (94 + 8)

	const itemsLeft = Math.abs(position.value) / 102

	position.value +=
		itemsLeft >= slidesToShow.value ? movePosition : itemsLeft * 102
	trackRef.value!.style.transform = `translateX(${position.value}px)`
}
const btnNext = () => {
	const itemWidth = 94 + 8
	const movePosition = 2 * itemWidth
	const itemsLeft =
		files.value.length -
		(Math.abs(position.value) + slidesToShow.value * itemWidth) / itemWidth

	position.value -=
		itemsLeft >= slidesToShow.value ? movePosition : itemsLeft * itemWidth
	trackRef.value!.style.transform = `translateX(${position.value}px)`
}

const recounedSlidesToShow = () => {
	const width = containter.value?.clientWidth!
	slidesToShow.value = Math.round(width / 102)
}
onUpdated(() => {
	recounedSlidesToShow()
})
onMounted(() => {
	window.addEventListener("resize", recounedSlidesToShow)
})
onUnmounted(() => {
	window.removeEventListener("resize", recounedSlidesToShow)
})

const showNextButton = computed(
	() =>
		position.value >
			-(files.value.length - slidesToShow.value) * (94 + 8) &&
		files.value.length > 3
)
</script>

<template>
	<div ref="containter" class="relative overflow-hidden">
		<div
			ref="trackRef"
			class="flex transition-transform duration-500 ease-[cubic-bezier(0,1.19,.99,1.07)]"
		>
			<div
				v-for="(image, index) in files"
				:key="image"
				:draggable="true"
				class="ml-2 first:ml-0"
				@dragstart="dragStart($event, index)"
				@dragleave="() => {}"
				@dragend="() => {}"
				@dragover.prevent="() => {}"
				@drop.prevent="dragDrop($event, index)"
			>
				<div class="relative h-[94px] w-[94px]">
					<div
						class="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-600"
						@click="deleteFile(index)"
					>
						<font-awesome-icon
							icon="fa-solid fa-xmark"
							class="h-3 w-3 text-white"
						/>
					</div>
					<img
						:src="image"
						alt="test"
						class="h-full w-full object-cover"
					/>
				</div>
			</div>
		</div>
		<div
			v-if="showNextButton"
			class="absolute top-1/2 right-[10px] z-10 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-lg text-gray-500"
			@click="btnNext"
		>
			<font-awesome-icon
				icon="fa-solid fa-chevron-right"
				class="text-[12px]"
			/>
		</div>
		<div
			v-if="position !== 0"
			class="absolute top-1/2 left-[10px] z-10 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-lg text-gray-500"
			@click="btnPrev"
		>
			<font-awesome-icon
				class="text-[12px]"
				icon="fa-solid fa-chevron-left"
			/>
		</div>
	</div>
</template>
