<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()
</script>

<template>
	<Teleport to="#modal">
		<div
			class="fixed top-0 left-0 z-30 flex h-full w-full items-center justify-center p-[30px]"
		>
			<div
				class="absolute inset-0 cursor-pointer bg-black bg-opacity-60"
				tabindex="0"
				role="button"
				@click="router.back()"
			></div>
			<slot />
		</div>
	</Teleport>
</template>
