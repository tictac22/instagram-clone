<script setup lang="ts">
import Header from "@/components/header/header.vue"
import Post from "@/components/post/post.vue"
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
	<div>
		<Header />
		<div class="max-w-4xl m-auto mt-8 px-3">
			<div class="flex items-center">
				<div class="max-w-[470px] w-full mr-8">
					<Post />
				</div>
				<div class="flex items-center self-start mt-4">
					<img
						alt="default"
						src="default.jpg"
						class="w-14 h-14 rounded-full mr-3"
					/>
					<div>
						<p class="font-medium">whitemoooo</p>
						<p class="text-gray-400">artemida</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
