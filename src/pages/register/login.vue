<script setup lang="ts">
import GetApp from "@/components/register/getApp.vue"
import Form from "@/components/register/login/form.vue"
import WithFacebook from "@/components/register/withFacebook.vue"
import { RoutePaths } from "@/utils/paths"
</script>

<template>
	<div class="flex min-h-screen items-center justify-center">
		<div class="w-full max-w-[350px] px-2 md:px-0">
			<div
				class="border border-solid border-[#dbdbdb] bg-white px-[40px] pt-9 pb-3"
			>
				<Form />
				<WithFacebook />
			</div>
			<p
				class="mt-3 w-full border border-solid border-[#dbdbdb] bg-white p-4 text-center text-sm"
			>
				Don't have an account?
				<router-link
					class="font-medium text-blue-900 hover:underline"
					:to="RoutePaths.SIGNUP"
					>Sign Up</router-link
				>
			</p>
			<GetApp />
		</div>
	</div>
</template>
