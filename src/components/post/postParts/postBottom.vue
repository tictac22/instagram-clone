<script setup lang="ts">
import { timeAgo } from "@/utils/helperFunctions"
import { reactive } from "vue"

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
}>()
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
	<div class="mt-2 px-3">
		<p class="font-medium">70,473 likes</p>
		<span class="inline-block text-sm">
			{{ props.fullName }} {{ state.firstPart || props.text }}
			<span
				v-if="state.extraText === false"
				class="cursor-pointer text-gray-500"
				@click="() => (state.extraText = true)"
				>... more</span
			>
			<span v-if="state.extraText === true">{{ state.secondPart }}</span>
		</span>
		<p class="mt-2 text-gray-400">
			<router-link :to="`/p/${props.id}`">
				View all ... comments
			</router-link>
		</p>
		<p class="my-2 text-xs text-gray-400">
			{{ timeAgo(props.createdAt) }}
		</p>
	</div>
</template>
