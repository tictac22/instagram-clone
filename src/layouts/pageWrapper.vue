<script setup lang="ts">
import Header from "../components/header/header.vue"
</script>

<template>
	<div>
		<Header />
		<div class="m-auto mt-8 max-w-[60rem] px-3">
			<slot />
		</div>
	</div>
</template>
