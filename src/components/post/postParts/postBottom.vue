<script setup lang="ts">
import { hashtag, timeAgo } from "@/utils/helperFunctions"
import { useUserStore } from "@/utils/pinia"
import { computed, reactive, ref } from "vue"

const state = reactive({
	firstPart: "",
	secondPart: "",
	extraText: false
})

const props = defineProps<{
	text: string
	createdAt: number
	id: string
	fullName: string
	likes: number
	comments: number
}>()
let firstPart: null | string = null
let secondPart = null

if (props.text.split("").length > 40) {
	const splitedText = props.text.split(" ")
	firstPart = splitedText.slice(0, 20).join(" ")
	secondPart = splitedText.slice(20, splitedText.length).join(" ")
	if (!secondPart || secondPart.length === 0) state.extraText = null
	state.firstPart = hashtag(firstPart)
	state.secondPart = hashtag(secondPart)
} else {
	state.extraText = null
}

const { user } = useUserStore()
const isLiked = computed(
	() => user && user.data.likes.find(item => item === props.id)
)
const likeText = ref<HTMLDivElement | null>(null)
const updateLikeText = () => {
	const text = parseInt(likeText.value!.innerHTML)
	if (isLiked.value) {
		likeText.value!.innerHTML = `${text - 1}`
		return
	}
	likeText.value!.innerHTML = `${text + 1}`
}
defineExpose({
	updateLikeText
})
</script>

<template>
	<div class="mt-2 px-3">
		<div class="">
			<p ref="likeText" class="inline font-medium">{{ props.likes }}</p>
			<span class="ml-1 font-medium">likes</span>
		</div>
		<span class="inline-block text-sm">
			{{ props.fullName }}
			<span v-html="state.firstPart || props.text"></span>
			<span
				v-if="state.extraText === false"
				class="cursor-pointer text-gray-500"
				@click="() => (state.extraText = true)"
				>... more</span
			>
			<span
				v-if="state.extraText === true"
				v-html="state.secondPart"
			></span>
		</span>
		<p class="mt-2 text-gray-400">
			<router-link
				:to="{ name: 'PostChildren', params: { id: props.id } }"
			>
				View all {{ props.comments }} comments
			</router-link>
		</p>
		<p class="my-2 text-xs text-gray-400">
			{{ timeAgo(props.createdAt) }}
		</p>
	</div>
</template>
