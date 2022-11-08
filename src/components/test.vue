<script setup lang="ts">
import { ref } from "vue"

const counter = ref(0)
const increment = () => counter.value++
const decrement = () => counter.value--
</script>

<template>
	<div>
		<h1 data-test="counter">counter {{ counter }}</h1>
		<button data-test="increment" @click="increment">increment</button>
		<button data-test="decrement" @click="decrement">decrement</button>
	</div>
</template>
