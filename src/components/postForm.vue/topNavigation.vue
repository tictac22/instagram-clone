<script setup lang="ts">
import { computed, inject } from "vue"
import { key } from "./context/key"

const { nextFormStep, prevFormStep, formStep, files } = inject(key)!

const titleText = computed(() =>
	formStep.value === 2
		? "Edit"
		: formStep.value === 1
		? "Crop"
		: "Create new post"
)
</script>

<template>
	<div
		class="flex items-center justify-between border-b border-[#DBDBDB] p-2"
	>
		<font-awesome-icon
			class="cursor-pointer"
			icon="fa-solid fa-arrow-left"
			@click="prevFormStep"
		/>
		<h3 class="m-auto font-medium">{{ titleText }}</h3>
		<div
			v-if="files.length > 0 && formStep < 3"
			class="cursor-pointer text-blue-500"
			aria-label="next step"
			@click="nextFormStep"
		>
			Next
		</div>
	</div>
</template>
