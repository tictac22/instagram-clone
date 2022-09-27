<script lang="ts" setup>
import WithFacebook from "@/components/register/withFacebook.vue"
import { RoutePaths } from "@/utils/paths"
import GetApp from "../getApp.vue"
import Form from "./form.vue"
import ImageSlider from "./imageSlider.vue"
</script>

<template>
	<div class="flex items-center justify-center min-h-screen">
		<ImageSlider class="mr-[32px]" />
		<div>
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
