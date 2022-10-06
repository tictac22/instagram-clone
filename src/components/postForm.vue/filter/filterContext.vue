<script setup lang="ts">
import { provide, ref } from "vue"
import Filter from "./filter.vue"
import { key } from "./key"

const currentImage = ref(0)
const nextCurrentImage = () => currentImage.value++
const prevCurrentImage = () => currentImage.value--

provide(key, {
	currentImage,
	nextCurrentImage,
	prevCurrentImage
})
</script>

<template>
	<Filter />
</template>
