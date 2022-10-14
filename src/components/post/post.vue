<script setup lang="ts">
import { reactive } from "vue"
//@ts-ignore
import { timeAgo } from "@/utils/helperFunctions"
import ImageSlider from "./imageSlider.vue"
const state = reactive({
	textarea: "",
	showEmojiPicker: false,
	popup: false,
	extraText: false,
	firstPart: "",
	secondPart: ""
})
type Author = {
	uid: string
	fullName: string
	photoUrl: string
	userName: string
}
const props = defineProps<{
	text: string
	id: string
	uid: string
	images: string[]
	author: Author
	createdAt: {
		seconds: number
	}
}>()
// /@\S+/gm

let firstPart: null | string = null
let secondPart = null

if (props.text.split("").length > 40) {
	const splitedText = props.text.split(" ")
	firstPart = splitedText.slice(0, 20).join(" ")
	secondPart = splitedText.slice(20, splitedText.length).join(" ")
	if (!secondPart || secondPart.length === 0) state.extraText = null
	state.firstPart = firstPart
	state.secondPart = secondPart
} else {
	state.extraText = null
}
</script>
<template>
	<div
		class="mb-4 w-full rounded-lg border border-solid border-[#DBDBDB] bg-white"
	>
		<div class="flex items-center px-3 py-2">
			<img
				:src="props.author.photoUrl"
				alt="default"
				class="h-8 w-8 rounded-full"
			/>
			<p class="mr-auto ml-2">{{ props.author.fullName }}</p>
		</div>

		<ImageSlider :images="props.images" />
		<div class="flex items-center px-3 py-2">
			<font-awesome-icon
				icon="fa-solid fa-heart"
				class="mr-2 h-6 w-6 stroke-black stroke-[39px] text-white"
			/>
			<font-awesome-icon
				icon="fa-solid fa-comment"
				class="mx-2 mr-auto h-6 w-6 stroke-black stroke-[39px] text-white"
			/>
			<font-awesome-icon
				icon="fa-solid fa-bookmark"
				class="h-6 w-6 stroke-black stroke-[39px] text-white"
			/>
		</div>
		<div class="mt-2 px-3">
			<p class="font-medium">70,473 likes</p>
			<span class="inline-block text-sm">
				{{ props.author.fullName }} {{ state.firstPart || props.text }}
				<span
					v-if="state.extraText === false"
					class="cursor-pointer text-gray-500"
					@click="() => (state.extraText = true)"
					>... more</span
				>
				<span v-if="state.extraText === true">{{
					state.secondPart
				}}</span>
			</span>
			<p class="mt-2 text-gray-400">View all 322 comments</p>
			<p class="my-2 text-xs text-gray-400">
				{{ timeAgo(props.createdAt.seconds) }}
			</p>
		</div>
	</div>
</template>
