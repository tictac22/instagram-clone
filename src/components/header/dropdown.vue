<script setup lang="ts">
import { ref } from "vue"

const expanded = ref(false)

const collapseMenu = () => (expanded.value = false)
</script>

<template>
	<div v-click-outside="collapseMenu" class="relative ml-6">
		<div class="cursor-pointer" @click="expanded = !expanded">
			<img alt="default" src="/default.jpg" class="h-6 w-6" />
		</div>
		<div
			class="absolute -right-[10px] top-[40px] w-[192px] rounded bg-white p-2 drop-shadow transition-all"
			:class="[
				expanded
					? 'opacity-1 pointer-events-auto visible translate-y-0'
					: 'pointer-events-none invisible -translate-y-3 opacity-0'
			]"
		>
			<div class="triangle -top-[13px] right-[11px]" />
			<p class="px-4 py-2">Profile</p>
			<p class="px-4 py-2">Log Out</p>
		</div>
	</div>
</template>
