<script setup lang="ts">
import { reactive } from "vue"

const state = reactive({
	isExpanded: false
})
const expandContainer = () => (state.isExpanded = true)
const collapseContainer = () => (state.isExpanded = false)
</script>

<template>
	<div class="h-9 relative" v-click-outside="collapseContainer">
		<div
			class="absolute left-2 cursor-pointer text-gray-500 top-1/2 -translate-y-1/2 pointer-events-none"
		>
			<font-awesome-icon icon="fa-solid fa-magnifying-glass" />
		</div>
		<input
			placeholder="Search"
			class="outline-none min-w-[268px] px-3 h-full rounded-lg bg-[#efefef] pl-7"
			v-on:focus="expandContainer"
		/>
		<div
			v-if="state.isExpanded"
			v-on:click="collapseContainer"
			class="absolute right-2 cursor-pointer text-gray-500 top-1/2 -translate-y-1/2"
		>
			<font-awesome-icon icon="fa-solid fa-circle-xmark" />
		</div>

		<div
			class="absolute h-[375px] w-[375px] -translate-x-12 bg-white p-3"
			v-if="state.isExpanded"
		>
			<div class="flex items-center flex-col h-full">
				<h4 class="font-bold self-start">Recent</h4>
				<p class="flex-auto flex items-center text-gray-400">
					No recent searches.
				</p>
			</div>
		</div>
	</div>
</template>
