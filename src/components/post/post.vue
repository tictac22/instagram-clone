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
	state.textarea = ""
}
//@ts-ignore
const textareaHandler = (el) => {
	const target = el.target
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
		class="w-full rounded-lg border border-solid border-[#DBDBDB] bg-white"
	>
		<div class="flex items-center px-3 py-2">
			<img
				src="/default.jpg"
				alt="default"
				class="h-8 w-8 rounded-full"
			/>
			<p class="mr-auto ml-2">natgeo</p>
			<div @click.stop="openPopup">
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
			class="z-3 fixed top-0 left-0 h-full w-full bg-black bg-opacity-70 transition-all"
			:class="[
				state.popup ? 'show scale-100 opacity-100' : 'hide scale-105'
			]"
		>
			<div class="flex min-h-full items-center justify-center">
				<div
					v-click-outside="closePopup"
					class="w-[400px] rounded bg-white"
				>
					<p
						class="cursor-pointer select-none border-b border-solid border-[#DBDBDB] py-3 text-center transition-colors hover:bg-slate-300"
					>
						Delete
					</p>
					<p
						class="cursor-pointer border-b border-solid border-[#DBDBDB] py-3 text-center transition-colors hover:bg-slate-300"
					>
						Unfollow
					</p>
					<p
						class="cursor-pointer border-b border-solid border-[#DBDBDB] py-3 text-center transition-colors hover:bg-slate-300"
					>
						Turn off commenting
					</p>
					<p
						class="cursor-pointer border-b border-solid border-[#DBDBDB] py-3 text-center transition-colors hover:bg-slate-300"
					>
						Go to post
					</p>
					<p
						class="cursor-pointer py-3 text-center transition-colors hover:bg-slate-300"
					>
						Copy link
					</p>
				</div>
			</div>
		</div>
		<div>
			<div class="h-[470px] w-[470px] bg-slate-600"></div>
		</div>
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
				natgeo {{ textParts.firstPart }}
				<span
					v-if="state.extraText === false"
					class="cursor-pointer text-gray-500"
					@click="() => (state.extraText = true)"
					>... more</span
				>
				<span v-if="state.extraText === true">{{
					textParts.secondPart
				}}</span>
			</span>
			<p class="mt-2 text-gray-400">View all 322 comments</p>
			<p class="my-2 text-xs text-gray-400">50 MINUTES AGO</p>
		</div>
		<div class="border-t border-solid border-[#DBDBDB]">
			<form
				v-click-outside="() => (state.showEmojiPicker = false)"
				class="relative flex px-3 py-2"
				@submit.prevent="submit"
			>
				<div class="">
					<svg
						class="_ab6- mr-3 cursor-pointer"
						aria-label="Emoji"
						color="#262626"
						fill="#262626"
						height="24"
						role="img"
						viewBox="0 0 24 24"
						width="24"
						@click="handleEmojiPicker"
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
					<EmojiPicker :native="true" @select="setEmoji" />
				</div>
				<textarea
					v-model="state.textarea"
					placeholder="Add a comment"
					class="h-[26px] w-full resize-none outline-none"
					:onkeyup="textareaHandler"
				/>
				<button class="ml-4 text-blue-500" type="submit">Post</button>
			</form>
		</div>
	</div>
</template>
