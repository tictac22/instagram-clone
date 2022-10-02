<script lang="ts" setup>
// Import Swiper styles
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/vue"
import { inject, reactive } from "vue"
import { key } from "../context/key"
const { files, swapFiles, deleteFile } = inject(key)!

const onSwiper = (swiper) => {
	console.log(swiper)
}
const onSlideChange = () => {
	console.log("slide change")
}

const state = reactive({
	currentDrag: null
})
const dragStart = (event: Event, index: number) => {
	state.currentDrag = index
	console.log(state.currentDrag)
}

const dragOver = (event: Event, index: number) => {
	console.log("dragOver", index)
}
const dragEnd = () => {}
const dragDrop = (event: Event, index: number) => {
	console.log("currentDrag", state.currentDrag)
	console.log("drop", index)
	swapFiles(state.currentDrag!, index)
	state.currentDrag = null
}
const mouseDown = () => {
	return false
}
</script>

<template>
	<div class="min-w-0">
		<Swiper
			:modules="[Navigation]"
			:space-between="8"
			@swiper="onSwiper"
			@slideChange="onSlideChange"
			:navigation="{
				hideOnClick: true,
				nextEl: '.swiper-button__next',
				prevEl: '.swiper-button__prev'
			}"
			:allow-touch-move="false"
			:slides-per-view="'auto'"
		>
			<SwiperSlide
				v-for="(image, index) in files"
				:draggable="true"
				v-on:dragstart="dragStart($event, index)"
				v-on:dragover.prevent="dragOver($event, index)"
				v-on:dragleave="dragEnd"
				v-on:dragend="dragEnd"
				v-on:mousedown="mouseDown"
				v-on:drop.prevent="dragDrop($event, index)"
				class="select-all"
				style="-webkit-user-drag: auto"
				><div class="w-[94px] h-[94px]">
					<div
						v-on:click="deleteFile(index)"
						class="bg-gray-600 rounded-full absolute right-1 top-1 h-5 w-5 flex items-center justify-center"
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
			</SwiperSlide>
			<div
				class="swiper-button__next w-5 h-5 z-10 -translate-y-1/2 cursor-pointer text-gray-500 text-lg rounded-full bg-white absolute top-1/2 right-[10px] flex items-center justify-center"
			>
				<font-awesome-icon
					icon="fa-solid fa-chevron-right"
					class="text-[12px]"
				/>
			</div>
			<div
				class="swiper-button__prev w-5 h-5 -translate-y-1/2 z-10 cursor-pointer text-gray-500 text-lg rounded-full bg-white absolute top-1/2 left-[10px] flex items-center justify-center"
			>
				<font-awesome-icon
					class="text-[12px]"
					icon="fa-solid fa-chevron-left"
				/>
			</div>
		</Swiper>
	</div>
</template>
