<script setup lang="ts">
import { inject } from "vue"
import { key } from "./context/key"

const { nextFormStep } = inject(key)!
</script>

<template>
	<div
		class="flex items-center justify-between border-b border-[#DBDBDB] p-2"
	>
		<font-awesome-icon icon="fa-solid fa-arrow-left" />
		<h3 class="font-medium">Create new post</h3>
		<div class="text-blue-500" @click="nextFormStep">Next</div>
	</div>
</template>
