<script lang="ts" setup>
import { ref } from "vue"

const props = defineProps<{
	handleInputFile: (event: Event) => void
}>()
const inputRef = ref<HTMLInputElement | null>(null)

const triggerClick = () => inputRef.value?.click()
</script>
<template>
	<div
		class="flex items-center mx-2 p-[13px] justify-center w-[50px] h-[50px] border border-[#DBDBDB] rounded-full cursor-pointer"
		tabindex="0"
		v-on:click="triggerClick"
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
			type="file"
			ref="inputRef"
			accept=".jpg,.jpeg,.png"
			class="hidden"
			v-on:change="props.handleInputFile"
		/>
	</div>
</template>
