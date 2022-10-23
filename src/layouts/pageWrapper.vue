<script setup lang="ts">
import ModalPostLoader from "@/components/post/modal/modalPostLoader.vue"
import Header from "../components/header/header.vue"
</script>

<template>
	<div>
		<Header />
		<ModalPostLoader />
		<div class="m-auto mt-8 max-w-4xl px-3">
			<slot />
		</div>
	</div>
</template>
