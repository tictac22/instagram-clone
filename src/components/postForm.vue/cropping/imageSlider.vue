<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted, onUpdated, ref } from "vue"
import { key } from "../context/key"
const { files, swapFiles, deleteFile } = inject(key)!

const currentDrag = ref<null | number>(null)
const dragStart = (event: Event, index: number) => {
	currentDrag.value = index
}

const dragDrop = (event: Event, index: number) => {
	swapFiles(currentDrag.value!, index)
	currentDrag.value = null
}

const position = ref(0)
const slidesToShow = ref(0)
const containter = ref<HTMLDivElement | null>(null)
const mouseDown = () => {
	return false
}
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
	<div ref="containter" class="overflow-hidden relative">
		<div
			ref="trackRef"
			class="flex transition-transform ease-[cubic-bezier(0,1.19,.99,1.07)] duration-500"
		>
			<div
				v-for="(image, index) in files"
				:key="image"
				:draggable="true"
				class="ml-2 first:ml-0"
				@dragstart="dragStart($event, index)"
				@mousedown="mouseDown"
				@drop.prevent="dragDrop($event, index)"
			>
				<div class="w-[94px] h-[94px] relative">
					<div
						class="bg-gray-600 rounded-full absolute right-1 top-1 h-5 w-5 flex items-center justify-center"
						@click="deleteFile(index)"
					>
						<font-awesome-icon
							icon="fa-solid fa-xmark"
							class="text-white w-3 h-3"
						/>
					</div>
					<img
						:src="image"
						alt="test"
						class="w-full h-full object-cover"
					/>
				</div>
			</div>
		</div>
		<div
			v-if="showNextButton"
			class="w-5 h-5 z-10 -translate-y-1/2 cursor-pointer text-gray-500 text-lg rounded-full bg-white absolute top-1/2 right-[10px] flex items-center justify-center"
			@click="btnNext"
		>
			<font-awesome-icon
				icon="fa-solid fa-chevron-right"
				class="text-[12px]"
			/>
		</div>
		<div
			v-if="position !== 0"
			class="w-5 h-5 -translate-y-1/2 z-10 cursor-pointer text-gray-500 text-lg rounded-full bg-white absolute top-1/2 left-[10px] flex items-center justify-center"
			@click="btnPrev"
		>
			<font-awesome-icon
				class="text-[12px]"
				icon="fa-solid fa-chevron-left"
			/>
		</div>
	</div>
</template>
