<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"

const currentImage = ref(1)

let intervalId: ReturnType<typeof setInterval>
onMounted(() => {
	intervalId = setInterval(() => {
		const value = currentImage.value
		currentImage.value = value === 4 ? 1 : value + 1
	}, 4000)
})
onUnmounted(() => clearInterval(intervalId))
</script>

<template>
	<div
		class="basis-[380px] h-[581px] bg-[url('/registration/back.png')] bg-[length:468px_634px] bg-position relative mr-8 hidden md:block"
	>
		<img
			v-for="item in [1, 2, 3, 4]"
			:src="`/registration/img${item}.png`"
			class="absolute h-[538px] w-[250px] right-[18px] bottom-[18px] transition-opacity duration-[1.9s] ease-in"
			:alt="`example${item}`"
			:class="[
				item === currentImage
					? 'visible opacity-100'
					: 'invisible opacity-0'
			]"
		/>
	</div>
</template>
