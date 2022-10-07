<script setup lang="ts">
import { provide, ref } from "vue"
import CroppingMain from "./croppingMain.vue"
import { key } from "./key"

const currentImage = ref(0)
const nextCurrentImage = () => currentImage.value++
const prevCurrentImage = () => currentImage.value--
const setCurrentImage = (index: number) => (currentImage.value = index)
provide(key, {
	currentImage,
	nextCurrentImage,
	prevCurrentImage,
	setCurrentImage
})
</script>

<template>
	<CroppingMain />
</template>
