<script setup lang="ts">
import { reactive } from "vue"

const state = reactive({
	isExpanded: false
})
const expandContainer = () => (state.isExpanded = true)
const collapseContainer = () => (state.isExpanded = false)
</script>

<template>
	<div v-click-outside="collapseContainer" class="relative h-9">
		<div
			class="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
		>
			<font-awesome-icon icon="fa-solid fa-magnifying-glass" />
		</div>
		<input
			placeholder="Search"
			class="h-full min-w-[268px] rounded-lg bg-[#efefef] px-3 pl-7 outline-none"
			@focus="expandContainer"
		/>
		<div
			v-if="state.isExpanded"
			class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
			@click="collapseContainer"
		>
			<font-awesome-icon icon="fa-solid fa-circle-xmark" />
		</div>

		<div
			class="absolute top-[50px] h-[375px] w-[375px] -translate-x-12 rounded-lg bg-white drop-shadow transition-all"
			:class="[
				state.isExpanded
					? 'opacity-1 pointer-events-auto visible translate-y-0'
					: 'pointer-events-none invisible -translate-y-3 opacity-0'
			]"
		>
			<div class="triangle -top-[13px] left-1/2 -translate-x-1/2" />
			<div class="relative flex h-full flex-col items-center p-3">
				<h4 class="self-start font-bold">Recent</h4>
				<p class="flex flex-auto items-center text-gray-400">
					No recent searches.
				</p>
			</div>
		</div>
	</div>
</template>
