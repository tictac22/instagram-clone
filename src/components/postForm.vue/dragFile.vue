<script lang="ts" setup>
import Drag from "@/assets/drag.vue"
import { computed, inject, ref } from "vue"
import { key } from "./context/key"

interface InputFileEvent extends Event {
	target: HTMLInputElement
}
const triggerInputFile = () => input.value!.click()
const input = ref<HTMLInputElement | null>(null)

const { uploadFileToCropper, nextFormStep } = inject(key)!

const isDragging = ref<null | boolean>(null)

const dragOverFile = () => (isDragging.value = true)

const dragLeave = () => (isDragging.value = false)

const dropFile = (event: Event) => {
	const target = (event as InputFileEvent).target
	isDragging.value = false
	uploadFileToCropper(event.dataTransfer.files[0])
	nextFormStep()
	target.value = ""
}
const handleInputFile = (event: Event) => {
	const target = (event as InputFileEvent).target
	const file = target.files![0]
	uploadFileToCropper(file)
	nextFormStep()
	target.value = ""
}
const isDraggingStyle = computed(() => ({
	pointerEvent: isDragging.value
		? "pointer-events-none"
		: "pointer-pointer-events-auto",

	background: isDragging.value ? "bg-[rgb(250,250,250)]" : "bg-white",
	textColor: isDragging.value ? "text-blue-500" : "text-black"
}))
</script>

<template>
	<div
		class="flex h-full w-full items-center justify-center"
		:class="[isDraggingStyle.background]"
		@dragstart.prevent="dragOverFile"
		@dragover.prevent="dragOverFile"
		@dragleave.prevent="dragLeave"
		@drop.prevent="dropFile"
	>
		<div
			class="flex flex-col items-center"
			:class="[isDraggingStyle.pointerEvent]"
		>
			<Drag :class="[isDraggingStyle.textColor]" />
			<p class="text-xl font-light text-[rgb(38,38,38)]">
				Drag photos and videos here
			</p>
			<button
				class="mt-3 rounded bg-blue-500 p-1 px-2 text-white"
				@click="triggerInputFile"
			>
				Select from computer
			</button>
			<input
				ref="input"
				type="file"
				class="hidden"
				accept=".jpg,.jpeg,.png"
				@change="handleInputFile"
			/>
		</div>
	</div>
</template>
