<script setup lang="ts">
import GetApp from "@/components/register/getApp.vue"
import Form from "@/components/register/signup/form.vue"
import WithFacebook from "@/components/register/withFacebook.vue"

import Facebookform from "@/components/register/facebook/Facebookform.vue"
import { RoutePaths } from "@/utils/paths"
import { useUserStore } from "@/utils/pinia"

const { user } = useUserStore()
console.log(user.data)
</script>

<template>
	<div class="flex min-h-screen flex-col items-center justify-center px-2">
		<div class="border border-solid border-[#dbdbdb] bg-white px-[40px]">
			<img
				src="/instagram/logo.png"
				alt="instagram"
				class="m-auto mt-9 mb-4 h-[51px] w-[175px]"
			/>
			<template v-if="!user.data.uid">
				<p class="max-w-[298px] text-center text-gray-500">
					Sign up to see photos and videos from your friends.
				</p>
				<WithFacebook />
				<div class="my-3 flex items-center">
					<span class="h-[1px] w-1/2 bg-[#dbdbdb]"></span>
					<span class="px-2 text-gray-500">OR</span>
					<span class="h-[1px] w-1/2 bg-[#dbdbdb]"></span>
				</div>
				<Form />
			</template>
			<Facebookform v-else />
		</div>
		<p
			v-if="!user.data"
			class="mt-3 w-full max-w-[380px] border border-solid border-[#dbdbdb] bg-white p-4 text-center text-sm"
		>
			Have an account?
			<router-link
				class="font-medium text-blue-900 hover:underline"
				:to="RoutePaths.LOGIN"
				>Log In</router-link
			>
		</p>
		<GetApp />
	</div>
</template>
