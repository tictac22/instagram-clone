<script lang="ts" setup>
// Import Swiper styles
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/vue"
import { reactive } from "vue"
const onSwiper = (swiper) => {
	console.log(swiper)
}
const onSlideChange = () => {
	console.log("slide change")
}
/**
 * <div
											class="mx-1 w-[94px] h-[94px]"
											v-for="file in state.files"
										>
											<img
												class="w-full h-full object-cover"
												:src="file"
											/>
										</div>
 * 
 * 
 */
const state = reactive({
	images: [
		"/test.jpg",
		"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
		"https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg",
		"https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg",
		"https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg",
		"https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg"
	],
	currentDrag: 0
})
const dragStart = (event: Event, index: number) => {
	state.currentDrag = index
}
const dragOver = (event: Event) => {}
const dragEnd = () => {}
const dragDrop = (event: Event, index: number) => {
	console.log("currentDrag", state.currentDrag)
	console.log("drop", index)
	state.images[state.currentDrag] = state.images.splice(
		index,
		1,
		state.images[state.currentDrag]
	)[0]
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
				v-for="(image, index) in state.images"
				:draggable="true"
				v-on:dragstart="(event) => dragStart(event, index)"
				v-on:dragover.prevent="dragOver"
				v-on:dragleave="dragEnd"
				v-on:dragend="dragEnd"
				v-on:drop.prevent="(event) => dragDrop(event, index)"
				class="select-all"
				style="-webkit-user-drag: auto"
				><div class="w-[94px] h-[94px]">
					<img :src="image" alt="test" class="w-full h-full" /></div
			></SwiperSlide>
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
