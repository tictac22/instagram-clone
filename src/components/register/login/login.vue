<script setup lang="ts">
import GetApp from "../getApp.vue"
import Form from "./form.vue"
import ImageSlider from "./imageSlider.vue"
</script>

<template>
	<div class="flex items-center min-h-screen justify-center">
		<ImageSlider />
		<div class="max-w-[350px] w-full px-2 md:px-0">
			<Form />
			<p
				class="border border-solid border-[#dbdbdb] text-center text-sm w-full bg-white mt-3 p-4"
			>
				Don't have an account? <span>Sign Up</span>
			</p>
			<GetApp />
		</div>
	</div>
</template>
