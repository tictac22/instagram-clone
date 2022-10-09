<script setup lang="ts">
import Spin from "@/components/register/spin.vue"
import { useUserStore } from "@/utils/pinia"
import { computed, defineAsyncComponent, inject, reactive } from "vue"
import { key } from "../context/key"

const { blobedFiles } = inject(key)!
const { user } = useUserStore()
const state = reactive({
	textarea: "",
	showEmojiPicker: false,
	isLoading: false
})
const setEmoji = (emoji: { i: string }) => (state.textarea += emoji.i)
const handleEmojiPicker = () => (state.showEmojiPicker = !state.showEmojiPicker)

const AsyncEmojiPicker = defineAsyncComponent(
	() => import("@/components/tools/emojiPicker.vue")
)

const disabledButton = computed(
	() => state.textarea.length === 0 || state.textarea.length > 200
)

//const router = useRouter()
const createPost = async () => {
	state.isLoading = true
	const { createPost: createFirebasePost, saveFiles } = await import(
		"@/utils/firebase"
	)

	//@ts-ignore
	const images = await saveFiles(blobedFiles.value)
	const data = await createFirebasePost({
		images,
		text: state.textarea,
		uid: user.data.uid
	})
	//router.push(`/p/${data.id}`)
	state.isLoading = false
}
</script>

<template>
	<div class="flex h-full w-[339px] flex-auto flex-col justify-start p-4">
		<div class="flex items-center">
			<img
				v-if="user.data.photoUrl"
				class="h-[28px] w-[28px] rounded-full"
				:src="user.data.photoUrl"
			/>
			<p class="ml-4 font-bold">{{ user.data.userName }}</p>
		</div>
		<textarea
			v-model="state.textarea"
			class="min-h-[100px] focus:outline-none"
			placeholder="Write a caption..."
		>
		</textarea>
		<div
			v-click-outside="() => (state.showEmojiPicker = false)"
			class="relative mt-2 flex items-center justify-between"
		>
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
			<p class="text-gray-300">{{ state.textarea.length }}/200</p>
			<div
				v-if="state.showEmojiPicker"
				class="absolute left-0 top-[30px]"
			>
				<AsyncEmojiPicker :set-emoji="setEmoji" />
			</div>
		</div>
		<button
			class="mt-3 flex h-[39px] items-center justify-center rounded bg-blue-600 p-2 text-center text-white"
			:disabled="disabledButton || state.isLoading"
			:class="[disabledButton ? 'opacity-50' : 'opacity-100']"
			@click="createPost"
		>
			<Spin v-if="state.isLoading" />
			<span v-else>Create post</span>
		</button>
	</div>
</template>
