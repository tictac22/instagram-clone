<script setup lang="ts">
import { signInWithFacebook } from "@/utils/firebase"
import GetApp from "../getApp.vue"
import Form from "./form.vue"
</script>

<template>
	<div class="flex items-center min-h-screen justify-center px-2 flex-col">
		<div class="bg-white border border-solid border-[#dbdbdb] px-[40px]">
			<img
				src="instagram/logo.png"
				alt="instagram"
				class="m-auto mt-9 w-[175px] h-[51px] mb-4"
			/>
			<p class="text-gray-500 max-w-[298px] text-center">
				Sign up to see photos and videos from your friends.
			</p>
			<button
				@click="signInWithFacebook"
				class="text-white bg-[#0095f6] flex items-center w-full justify-center rounded p-2 my-4 cursor-pointer"
			>
				<div class="bg-white p-1 rounded-sm">
					<img
						src="facebook-white.svg"
						alt="facebook"
						class="w-4 h-4"
					/>
				</div>
				<span class="ml-2">Log in with Facebook</span>
			</button>
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
			Have an account? <span>Log In</span>
		</p>
		<GetApp />
	</div>
</template>
