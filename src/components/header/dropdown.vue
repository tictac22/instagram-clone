<script setup lang="ts">
import { useUserStore } from "@/utils/pinia"
import { ref } from "vue"

const expanded = ref(false)

const collapseMenu = () => (expanded.value = false)
const openMenu = () => (expanded.value = true)

const { logOut, user } = useUserStore()
</script>

<template>
	<div v-click-outside="collapseMenu" class="relative ml-6">
		<div
			class="cursor-pointer"
			tabindex="0"
			@click="openMenu"
			@keydown.enter="openMenu"
		>
			<img
				alt="default"
				:src="user.data.photoUrl ? user.data.photoUrl : '/default.jpg'"
				class="h-6 w-6 rounded-full"
			/>
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
			<p
				class="cursor-pointer px-4 py-2 transition-colors hover:bg-gray-200"
				tabindex="0"
			>
				Profile
			</p>
			<p
				class="cursor-pointer px-4 py-2 transition-colors hover:bg-gray-200"
				tabindex="0"
				@click="logOut"
				@keydown.enter="logOut"
			>
				Log Out
			</p>
		</div>
	</div>
</template>
