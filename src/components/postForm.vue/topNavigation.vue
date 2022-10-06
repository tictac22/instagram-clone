<script setup lang="ts">
import { computed, inject } from "vue"
import { key } from "./context/key"

const { nextFormStep, prevFormStep, formStep } = inject(key)!

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
		<h3 class="font-medium">{{ titleText }}</h3>
		<div class="cursor-pointer text-blue-500" @click="nextFormStep">
			Next
		</div>
	</div>
</template>
