<script setup lang="ts">
import { computed, onMounted, onUnmounted, onUpdated, reactive, ref } from "vue"

const props = defineProps<{
	images: string[]
	itemWidth: number
}>()
//eslint-disable-next-line
const itemWidth = props.itemWidth
const container = ref<HTMLDivElement | null>(null)
const trackRef = ref<HTMLDivElement | null>(null)
const state = reactive({
	slidesToShow: 0,
	position: 0
})
const currentImage = computed(() => Math.abs(state.position) / itemWidth)
const prevSlide = () => {
	const movePosition = 1 * itemWidth

	const itemsLeft = Math.abs(state.position) / itemWidth

	state.position +=
		itemsLeft >= state.slidesToShow ? movePosition : itemsLeft * itemWidth
	trackRef.value!.style.transform = `translateX(${state.position}px)`
}
const nextSlide = () => {
	const movePosition = 1 * itemWidth
	const itemsLeft =
		props.images.length -
		(Math.abs(state.position) + state.slidesToShow * itemWidth) / itemWidth

	state.position -=
		itemsLeft >= state.slidesToShow ? movePosition : itemsLeft * itemWidth
	trackRef.value!.style.transform = `translateX(${state.position}px)`
}
const recounedSlidesToShow = () => {
	const width = container.value?.clientWidth!
	state.slidesToShow = Math.round(width / itemWidth)
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
		state.position >
			-(props.images.length - state.slidesToShow) * itemWidth &&
		props.images.length > 1
)
</script>

<template>
	<div ref="container" class="relative z-[2] w-full overflow-hidden">
		<div ref="trackRef" class="flex transition-transform duration-500">
			<div
				v-for="image in props.images"
				:key="image"
				class="relative block w-full shrink-0 select-none overflow-hidden pb-[125%]"
			>
				<img
					:src="image"
					class="absolute inset-0 h-full w-full object-cover"
				/>
			</div>
		</div>
		<div
			v-if="state.position !== 0"
			class="absolute left-3 top-1/2 flex h-[24px] w-[24px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white opacity-80"
			tabindex="0"
			@keydown.enter="prevSlide"
			@click="prevSlide"
		>
			<font-awesome-icon
				class="text-[12px]"
				icon="fa-solid fa-chevron-left"
			/>
		</div>
		<div
			v-if="showNextButton"
			class="absolute right-3 top-1/2 flex h-[24px] w-[24px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white opacity-80"
			tabindex="0"
			@click="nextSlide"
			@keydown.enter="nextSlide"
		>
			<font-awesome-icon
				icon="fa-solid fa-chevron-right"
				class="text-[12px]"
			/>
		</div>
		<div
			v-if="props.images.length > 1"
			class="absolute left-1/2 bottom-3 z-30 flex -translate-x-1/2"
		>
			<div
				v-for="(item, index) in props.images"
				:key="item"
				class="mx-1 h-2 w-2 rounded-full bg-white"
				:class="[currentImage === index ? '' : 'opacity-70']"
			></div>
		</div>
	</div>
</template>
