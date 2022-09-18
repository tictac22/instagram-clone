<script setup lang="ts">
import Header from "@/header/header.vue"
import { reactive } from "vue"
const count = reactive({
	count: 0
})
const increment = () => count.count++
const decrement = () => count.count--
//#fafafa
const something = "sadasdsadsa"
</script>

<template>
	<div><Header /></div>
</template>
