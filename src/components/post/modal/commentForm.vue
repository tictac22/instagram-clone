<script setup lang="ts">
import { useUserStore } from "@/utils/pinia"
import { defineAsyncComponent, reactive, ref } from "vue"
import { UserComment } from "./type"

const AsyncEmojiPicker = defineAsyncComponent(
	() => import("@/components/tools/emojiPicker.vue")
)
const props = defineProps<{
	id: string
	addcreatedPost: (data: UserComment) => void
}>()
const textAreaRef = ref<HTMLTextAreaElement | null>(null)
const state = reactive({
	textarea: "",
	showEmojiPicker: false
})
const setEmoji = (emoji: { i: string }) => (state.textarea += emoji.i)
const handleEmojiPicker = () => (state.showEmojiPicker = !state.showEmojiPicker)

const { user } = useUserStore()
const submit = async () => {
	const { createCommentPost } = await import("@/utils/firebase")

	await createCommentPost({
		id: props.id,
		text: state.textarea,
		...user.data
	})
	props.addcreatedPost({
		...user.data,
		userId: user.data.uid,
		text: state.textarea
	})
	state.textarea = ""
}
//@ts-ignore
const textareaHandler = el => {
	const target = el.target
	target.style.height = "1px"

	if (state.textarea.length * 11 <= target.offsetWidth - 11) {
		target.style.height = "26px"
		return
	}
	target.style.height = 25 + target.scrollHeight + "px"
}
</script>

<template>
	<div class="border-t border-solid border-gray-500">
		<form
			ref="textAreaRef"
			v-click-outside="() => (state.showEmojiPicker = false)"
			class="relative flex px-3 py-2"
			@submit.prevent="submit"
		>
			<div class="relative h-[24px]">
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
				<Suspense timeout="0">
					<template #fallback>
						<div
							class="absolute top-0 left-0 h-[24px] w-[24px] animate-pulse rounded-full bg-slate-200"
						/>
					</template>
					<div
						v-if="state.showEmojiPicker"
						class="absolute left-0 bottom-7"
					>
						<AsyncEmojiPicker :set-emoji="setEmoji" />
					</div>
				</Suspense>
			</div>
			<textarea
				v-model="state.textarea"
				placeholder="Add a comment"
				class="scroll h-[26px] w-full resize-none outline-none"
				:onkeyup="textareaHandler"
			/>
			<button class="ml-1 text-blue-500" type="submit">Post</button>
		</form>
	</div>
</template>
