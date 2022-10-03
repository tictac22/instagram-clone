<script setup lang="ts">
import GetApp from "@/components/register/getApp.vue"
import Form from "@/components/register/login/form.vue"
import WithFacebook from "@/components/register/withFacebook.vue"
import { RoutePaths } from "@/utils/paths"
</script>

<template>
	<div class="flex items-center min-h-screen justify-center">
		<div class="max-w-[350px] w-full px-2 md:px-0">
			<div
				class="bg-white border border-solid border-[#dbdbdb] px-[40px] pt-9 pb-3"
			>
				<Form />
				<WithFacebook />
			</div>
			<p
				class="border border-solid border-[#dbdbdb] text-center text-sm w-full bg-white mt-3 p-4"
			>
				Don't have an account?
				<router-link
					class="text-blue-900 font-medium hover:underline"
					:to="RoutePaths.SIGNUP"
					>Sign Up</router-link
				>
			</p>
			<GetApp />
		</div>
	</div>
</template>
