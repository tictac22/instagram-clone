<script setup lang="ts">
import { ref } from "vue"

const expanded = ref(false)

const expandMenu = () => (expanded.value = true)
const collapseMenu = () => (expanded.value = false)
</script>

<template>
	<div class="relative ml-6" v-click-outside="collapseMenu">
		<div class="cursor-pointer" v-on:click="expanded = !expanded">
			<img alt="default" src="/default.jpg" class="w-6 h-6" />
		</div>
		<div
			class="bg-white drop-shadow p-2 w-[192px] rounded absolute -right-[10px] top-[40px] transition-all"
			:class="[
				expanded
					? 'opacity-1 visible pointer-events-auto translate-y-0'
					: 'opacity-0 invisible pointer-events-none -translate-y-3'
			]"
		>
			<div class="triangle -top-[13px] right-[11px]" />
			<p class="px-4 py-2">Profile</p>
			<p class="px-4 py-2">Log Out</p>
		</div>
	</div>
</template>
