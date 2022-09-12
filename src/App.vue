<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
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
	<div>
		<h2>INcrement {{ count.count }}</h2>
		<p @click="increment">increment</p>
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
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
