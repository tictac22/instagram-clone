<script lang="ts" setup>
import Drag from "@/assets/drag.vue"
import { computed, onMounted, ref } from "vue"

interface InputFileEvent extends Event {
	target: HTMLInputElement
}
const triggerInputFile = () => input.value!.click()
const input = ref<HTMLInputElement | null>(null)
const props = defineProps<{
	handleInputFile: (event: Event) => void
	uploadFileToCropper: (file: File) => void
}>()

const isDragging = ref<null | boolean>(null)

const dragOverFile = () => (isDragging.value = true)

const dragLeave = () => (isDragging.value = false)

const dropFile = (event: Event) => {
	const target = (event as InputFileEvent).target
	isDragging.value = false
	props.uploadFileToCropper(event.dataTransfer.files[0])
	target.value = ""
}

const isDraggingStyle = computed(() => ({
	pointerEvent: isDragging.value
		? "pointer-events-none"
		: "pointer-pointer-events-auto",

	background: isDragging.value ? "bg-[rgb(250,250,250)]" : "bg-white",
	textColor: isDragging.value ? "text-blue-500" : "text-black"
}))
onMounted(() => {
	console.log(isDragging)
})
console.log(isDragging.value)
</script>

<template>
	<div
		class="w-full h-full items-center justify-center flex"
		:class="[isDraggingStyle.background]"
		v-on:dragstart.prevent="dragOverFile"
		v-on:dragover.prevent="dragOverFile"
		v-on:dragleave.prevent="dragLeave"
		v-on:drop.prevent="dropFile"
	>
		<div
			class="flex items-center flex-col"
			:class="[isDraggingStyle.pointerEvent]"
		>
			<Drag :class="[isDraggingStyle.textColor]" />
			<p class="text-xl font-light text-[rgb(38,38,38)]">
				Drag photos and videos here
			</p>
			<button
				class="bg-blue-500 text-white p-1 px-2 rounded mt-3"
				v-on:click="triggerInputFile"
			>
				Select from computer
			</button>
			<input
				ref="input"
				type="file"
				class="hidden"
				v-on:change="props.handleInputFile"
				accept=".jpg,.jpeg,.png"
			/>
		</div>
	</div>
</template>
