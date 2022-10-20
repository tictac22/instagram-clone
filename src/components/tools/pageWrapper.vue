<script setup lang="ts">
import Header from "../header/header.vue"
</script>

<template>
	<div>
		<Header />
		<div class="m-auto mt-8 max-w-4xl px-3">
			<slot />
		</div>
	</div>
</template>
