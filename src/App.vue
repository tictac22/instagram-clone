<script setup lang="ts">
import { reactive } from "vue"
import HelloWorld from "./components/HelloWorld.vue"

const count = reactive({
	count: 0
})
const increment = () => count.count++
const decrement = () => count.count--
const something = "sadasdsadsa"
</script>

<template>
	<div class="bg-slate-900">
		<div class="bg-cyan-600">
			<h2>INcrement {{ count.count }}</h2>
			<p @click="increment" class="bg-red-500">increment</p>
			<p @click="decrement">increment</p>
		</div>
		<div>
			<a href="https://vitejs.dev" target="_blank">
				<img src="/vite.svg" class="logo" alt="Vite logo" />
			</a>
			<a href="https://vuejs.org/" target="_blank">
				<img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
			</a>
		</div>
		<HelloWorld msg="Vite + Vue" />
	</div>
</template>
