<script setup lang="ts">
import GetApp from "@/components/register/getapp.vue"
import Form from "@/components/register/signup/form.vue"
import WithFacebook from "@/components/register/withFacebook.vue"

import { RoutePaths } from "@/utils/paths"
</script>

<template>
	<div class="flex items-center min-h-screen justify-center px-2 flex-col">
		<div class="bg-white border border-solid border-[#dbdbdb] px-[40px]">
			<img
				src="/instagram/logo.png"
				alt="instagram"
				class="m-auto mt-9 w-[175px] h-[51px] mb-4"
			/>
			<p class="text-gray-500 max-w-[298px] text-center">
				Sign up to see photos and videos from your friends.
			</p>
			<WithFacebook />
			<div class="flex items-center my-3">
				<span class="bg-[#dbdbdb] h-[1px] w-1/2"></span>
				<span class="text-gray-500 px-2">OR</span>
				<span class="bg-[#dbdbdb] h-[1px] w-1/2"></span>
			</div>
			<Form />
		</div>
		<p
			class="border border-solid border-[#dbdbdb] text-center text-sm w-full bg-white mt-3 p-4 max-w-[380px]"
		>
			Have an account?
			<router-link
				class="text-blue-900 font-medium hover:underline"
				:to="RoutePaths.LOGIN"
				>Log In</router-link
			>
		</p>
		<GetApp />
	</div>
</template>
