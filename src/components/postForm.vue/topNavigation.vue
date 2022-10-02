<script setup lang="ts">
import { inject } from "vue"
import { key } from "./context/key"

const { files, nextFormStep } = inject(key)!
</script>

<template>
	<div
		class="flex items-center justify-between p-2 border-b border-[#DBDBDB]"
	>
		<font-awesome-icon icon="fa-solid fa-arrow-left" />
		<h3 class="font-medium">Create new post</h3>
		<div @click="nextFormStep" class="text-blue-500">Next</div>
	</div>
</template>
