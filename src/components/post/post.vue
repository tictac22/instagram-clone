<script setup lang="ts">
import { computed, reactive } from "vue"
//@ts-ignore
import EmojiPicker from "vue3-emoji-picker"
import "../../../node_modules/vue3-emoji-picker/dist/style.css"
const state = reactive({
	textarea: "",
	showEmojiPicker: false,
	popup: false,
	extraText: false
})

const text =
	" Video by @acacia.johnson | A horned puffin surveys the sea outside its nest on Round Island, Alaska. Like many seabirds, puffins are climate change indicator species—meaning that monitoring their population can give researchers insight into what’s going on in the broader marine ecosystem. They’re also simply beautiful to glimpse in the wild! Follow me at @acacia.johnson for more from Alaska and beyond. #puffin #alaska #roundisland #seabirds #wildlife"
const closePopup = () => (state.popup = false)

const openPopup = () => (state.popup = true)

const setEmoji = (emoji: { i: string }) => (state.textarea += emoji.i)

const handleEmojiPicker = () => (state.showEmojiPicker = !state.showEmojiPicker)

const submit = () => {
	console.log(state.textarea)
	state.textarea = ""
}
//@ts-ignore
const textareaHandler = (el) => {
	const target = el.target
	console.log(target.value.length)
	if (target.value.length > 38) {
		target.style.height = "1px"
		target.style.height = 10 + target.scrollHeight + "px"
	}
}
const textParts = computed(() => {
	let firstPart = null
	let secondPart = null

	if (text.split("").length > 40) {
		const splitedText = text.split(" ")
		firstPart = splitedText.slice(0, 20).join(" ")
		secondPart = splitedText.slice(20, splitedText.length).join(" ")
	}
	return {
		firstPart,
		secondPart
	}
})
</script>
<template>
	<div
		class="w-full border border-solid border-[#DBDBDB] rounded-lg bg-white"
	>
		<div class="flex items-center px-3 py-2">
			<img
				src="/default.jpg"
				alt="default"
				class="w-8 h-8 rounded-full"
			/>
			<p class="mr-auto ml-2">natgeo</p>
			<div v-on:click.stop="openPopup">
				<svg
					aria-label="More options"
					class="_ab6- cursor-pointer"
					color="#262626"
					fill="#262626"
					height="24"
					role="img"
					viewBox="0 0 24 24"
					width="24"
				>
					<circle cx="12" cy="12" r="1.5"></circle>
					<circle cx="6" cy="12" r="1.5"></circle>
					<circle cx="18" cy="12" r="1.5"></circle>
				</svg>
			</div>
		</div>

		<div
			class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 transition-all z-3"
			:class="[
				state.popup ? 'show opacity-100 scale-100' : 'hide scale-105'
			]"
		>
			<div class="flex items-center justify-center min-h-full">
				<div
					class="w-[400px] bg-white rounded"
					v-click-outside="closePopup"
				>
					<p
						class="text-center select-none py-3 border-b border-solid border-[#DBDBDB] hover:bg-slate-300 cursor-pointer transition-colors"
					>
						Delete
					</p>
					<p
						class="text-center py-3 border-b border-solid border-[#DBDBDB] hover:bg-slate-300 cursor-pointer transition-colors"
					>
						Unfollow
					</p>
					<p
						class="text-center py-3 border-b border-solid border-[#DBDBDB] hover:bg-slate-300 cursor-pointer transition-colors"
					>
						Turn off commenting
					</p>
					<p
						class="text-center py-3 border-b border-solid border-[#DBDBDB] hover:bg-slate-300 cursor-pointer transition-colors"
					>
						Go to post
					</p>
					<p
						class="text-center py-3 hover:bg-slate-300 cursor-pointer transition-colors"
					>
						Copy link
					</p>
				</div>
			</div>
		</div>
		<div>
			<div class="h-[470px] w-[470px] bg-slate-600"></div>
		</div>
		<div class="px-3 py-2 flex items-center">
			<font-awesome-icon
				icon="fa-solid fa-heart"
				class="w-6 h-6 text-white stroke-black stroke-[39px] mr-2"
			/>
			<font-awesome-icon
				icon="fa-solid fa-comment"
				class="w-6 h-6 text-white stroke-black stroke-[39px] mx-2 mr-auto"
			/>
			<font-awesome-icon
				icon="fa-solid fa-bookmark"
				class="w-6 h-6 text-white stroke-black stroke-[39px]"
			/>
		</div>
		<div class="px-3 mt-2">
			<p class="font-medium">70,473 likes</p>
			<span class="text-sm inline-block">
				natgeo {{ textParts.firstPart }}
				<span
					class="text-gray-500 cursor-pointer"
					v-on:click="() => (state.extraText = true)"
					v-if="state.extraText === false"
					>... more</span
				>
				<span v-if="state.extraText === true">{{
					textParts.secondPart
				}}</span>
			</span>
			<p class="text-gray-400 mt-2">View all 322 comments</p>
			<p class="text-gray-400 text-xs my-2">50 MINUTES AGO</p>
		</div>
		<div class="border-t border-solid border-[#DBDBDB]">
			<form
				class="relative flex px-3 py-2"
				v-click-outside="() => (state.showEmojiPicker = false)"
				v-on:submit.prevent="submit"
			>
				<div class="">
					<svg
						aria-label="Emoji"
						class="_ab6- mr-3 cursor-pointer"
						color="#262626"
						fill="#262626"
						height="24"
						role="img"
						viewBox="0 0 24 24"
						width="24"
						v-on:click="handleEmojiPicker"
					>
						<path
							d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"
						></path>
					</svg>
				</div>
				<div
					v-if="state.showEmojiPicker"
					class="absolute left-0 bottom-7"
				>
					<EmojiPicker @select="setEmoji" :native="true" />
				</div>
				<textarea
					placeholder="Add a comment"
					class="w-full resize-none outline-none h-[26px]"
					:onkeyup="textareaHandler"
					v-model="state.textarea"
				/>
				<button class="ml-4 text-blue-500" type="submit">Post</button>
			</form>
		</div>
	</div>
</template>
