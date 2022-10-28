<script setup lang="ts">
import { useLoadingBar } from "@/utils/pinia"
import { reactive } from "vue"
const stateBar = reactive({
	loadingWidth: 0,
	show: false
})
const state = useLoadingBar()
let loadingInterval: ReturnType<typeof setInterval> | null = null
state.$subscribe((mutation, state) => {
	if (state.loading) {
		stateBar.show = true
		stateBar.loadingWidth = 0
		loadingInterval = setInterval(() => {
			if (stateBar.loadingWidth + 25 > 100) {
				stateBar.loadingWidth = 100
				return
			}
			stateBar.loadingWidth += 25
		}, 250)
	} else {
		clearInterval(loadingInterval!)
		Object.assign(stateBar, {
			loadingWidth: 100,
			show: false
		})
	}
})
</script>

<template>
	<div
		v-show="stateBar.show"
		class="h-1 bg-blue-500 transition-all duration-300"
		:style="{ width: `${stateBar.loadingWidth}%` }"
	/>
</template>
