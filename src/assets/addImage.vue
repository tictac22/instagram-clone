<script lang="ts" setup>
import { key } from "@/components/postForm.vue/context/key"
import { inject, ref } from "vue"
interface InputFileEvent extends Event {
	target: HTMLInputElement
}
const { uploadFileToCropper } = inject(key)!

const handleInputFile = (event: Event) => {
	const target = (event as InputFileEvent).target
	const file = target.files![0]
	uploadFileToCropper(file)
	target.value = ""
}
const inputRef = ref<HTMLInputElement | null>(null)

const triggerClick = () => inputRef.value?.click()
</script>
<template>
	<div
		class="mx-2 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full border border-[#DBDBDB] p-[13px]"
		tabindex="0"
		@click="triggerClick"
	>
		<svg
			aria-label="Plus icon"
			class="_ab6-"
			color="#8e8e8e"
			fill="#8e8e8e"
			height="22"
			role="img"
			viewBox="0 0 24 24"
			width="22"
		>
			<path
				d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"
			></path>
		</svg>
		<input
			ref="inputRef"
			type="file"
			accept=".jpg,.jpeg,.png"
			class="hidden"
			@change="handleInputFile"
		/>
	</div>
</template>
