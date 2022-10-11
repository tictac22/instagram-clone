<script setup lang="ts">
//import { suggestUser } from "@/utils/firebase"
import Spin from "@/components/tools/spin.vue"
import { suggestUser } from "@/utils/firebase"
import { debounce } from "@/utils/helperFunctions"
import { useUserStore } from "@/utils/pinia"

import {
	computed,
	defineAsyncComponent,
	inject,
	reactive,
	ref,
	watch
} from "vue"
import { useRouter } from "vue-router"
import { key } from "../context/key"

type suggestedUser = {
	userName: string
	photoUrl: string
	fullName: string
}
const { blobedFiles } = inject(key)!
const router = useRouter()
const { user } = useUserStore()
const state = reactive({
	textarea: "",
	showUserPicker: false,
	userPickLoading: false,
	showEmojiPicker: false,
	isLoading: false,
	suggestedUsers: [] as suggestedUser[]
})
const textAreaRef = ref<HTMLTextAreaElement | null>(null)
watch(
	() => state.textarea,
	//@ts-ignore
	debounce(async value => {
		const lastWord = value.replace(/\s+/g, " ").split(" ").pop()!

		if (!lastWord.match(/^@./)) return (state.showUserPicker = false)
		state.showUserPicker = true
		const suggestedUsers = await suggestUser(lastWord)
		if (suggestedUsers.length === 0) {
			state.userPickLoading = false
			state.showUserPicker = false
			return
		}
		//@ts-ignore
		state.suggestedUsers = suggestedUsers
	}, 500)
)
const setUser = (user: string) => {
	const splittedText = state.textarea.split(" ")

	splittedText[splittedText.length - 1] = "@" + user
	state.textarea = splittedText.join(" ") + " "

	textAreaRef.value!.focus()
	state.showUserPicker = false
	state.userPickLoading = false
}
const textAreaInput = (e: Event) => {
	const target = e.target as HTMLInputElement
	state.textarea = target.value

	const lastWord = state.textarea.replace(/\s+/g, " ").split(" ").pop()!
	if (!lastWord.match(/^@./)) return (state.userPickLoading = false)
	state.userPickLoading = true
}
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
		creatorUid: user.data.uid
	})
	router.push(`/p/${data.id}`)
	state.isLoading = false
}
</script>

<template>
	<div
		class="relative flex h-full w-[339px] flex-auto flex-col justify-start p-4"
	>
		<div class="flex items-center">
			<img
				v-if="user.data.photoUrl"
				class="h-[28px] w-[28px] rounded-full"
				:src="user.data.photoUrl"
			/>
			<p class="ml-4 font-bold">{{ user.data.userName }}</p>
		</div>
		<textarea
			ref="textAreaRef"
			class="min-h-[100px] focus:outline-none"
			placeholder="Write a caption..."
			:value="state.textarea"
			@input="textAreaInput"
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
		<div
			v-if="state.userPickLoading"
			class="mt-2 max-h-[205px] overflow-y-scroll shadow-md"
		>
			<div
				v-if="!state.showUserPicker"
				class="flex items-center justify-center py-3 text-center"
			>
				<Spin class="text-blue-500" />
			</div>
			<template v-else>
				<div
					v-for="item in state.suggestedUsers"
					:key="item.userName"
					class="flex cursor-pointer items-center border-b border-solid border-gray-400 p-2 pl-4"
					tabindex="0"
					@keydown.enter="setUser(item.userName)"
					@click="setUser(item.userName)"
				>
					<img
						:src="item.photoUrl"
						class="h-[30px] w-[30px] rounded-full"
					/>
					<div class="ml-2">
						<p class="text-xs font-bold">{{ item.userName }}</p>
						<p class="text-xs">{{ item.fullName }}</p>
					</div>
				</div>
			</template>
		</div>
		<button
			v-else
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
