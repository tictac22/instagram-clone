<script setup lang="ts">
import { getPost } from "@/utils/firebase"
import { handlePadingToWindow } from "@/utils/helperFunctions"
import { onMounted, onUnmounted } from "vue"
import { useRoute, useRouter } from "vue-router"
const router = useRouter()
const route = useRoute()

const data = await getPost(route.params.id as string)
console.log(data)
const closePopup = (e: Event) => {
	if (e.keyCode === 27) {
		router.back()
	}
}
onMounted(() => {
	handlePadingToWindow("hide")
	window.addEventListener("keydown", closePopup)
})
onUnmounted(() => {
	handlePadingToWindow("show")
	window.removeEventListener("keydown", closePopup)
})
</script>

<template>
	<Teleport to="#modal">
		<div
			class="fixed top-0 left-0 z-30 flex h-full w-full items-center justify-center"
		>
			<div
				class="absolute inset-0 cursor-pointer bg-black bg-opacity-60"
				tabindex="0"
				role="button"
				@click="router.back()"
			></div>
			<div class="relative bg-white">I'm {{ route.params.id }}</div>
		</div>
	</Teleport>
</template>
