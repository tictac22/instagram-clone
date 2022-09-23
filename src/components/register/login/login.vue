<script setup lang="ts">
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
			<p class="text-center mt-2">Get the app.</p>
			<div class="flex items-center justify-center mt-2">
				<a
					href="https://apps.apple.com/app/instagram/id389801252?vt=lo"
					target="_blank"
				>
					<img
						src="/registration/apple.png"
						alt="apple"
						class="h-[40px]"
					/>
				</a>
				<a
					class="ml-2"
					href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D119226F1-A3C7-4E36-BA51-6BC6F8913245%26utm_content%3Dlo%26utm_medium%3Dbadge"
					target="_blank"
				>
					<img
						src="/registration/google.png"
						alt="google"
						class="h-[40px]"
					/>
				</a>
			</div>
		</div>
	</div>
</template>
