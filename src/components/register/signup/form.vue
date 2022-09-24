<script setup lang="ts">
import { onUpdated, ref } from "vue"
import Agreement from "./agreement.vue"

const test = ref("")
onUpdated(() => {
	console.log("render from")
})
</script>
<template>
	<form>
		<div class="mt-6 flex flex-col">
			<input
				placeholder="Email"
				class="pl-[9px] pr-[7px] pb-[8px] bg-[#fafafa] border border-solid border-[#dbdbdb] placeholder:text-xs rounded outline-none focus:border-[#a6a4a4] w-full"
				type="text"
				v-model="test"
			/>
			<input
				placeholder="Full Name"
				class="pl-[9px] pr-[7px] pb-[8px] bg-[#fafafa] border border-solid border-[#dbdbdb] placeholder:text-xs rounded outline-none focus:border-[#a6a4a4] w-full mt-2"
				type="password"
			/>
			<input
				placeholder="Username"
				class="pl-[9px] pr-[7px] pb-[8px] bg-[#fafafa] border border-solid border-[#dbdbdb] placeholder:text-xs rounded outline-none focus:border-[#a6a4a4] w-full mt-2"
				type="password"
			/>
			<input
				placeholder="Password"
				class="pl-[9px] pr-[7px] pb-[8px] bg-[#fafafa] border border-solid border-[#dbdbdb] placeholder:text-xs rounded outline-none focus:border-[#a6a4a4] w-full mt-2"
				type="password"
			/>
		</div>
		<Agreement />
		<button
			type="submit"
			class="bg-[#0095f6] text-white rounded my-3 py-1 w-full cursor-pointer"
		>
			Next
		</button>
	</form>
</template>
