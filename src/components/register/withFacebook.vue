<script lang="ts" setup>
import { RoutePaths } from "@/utils/paths"
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const alreadyInUse = ref(false)
const signWithFacebook = async () => {
	try {
		const { signInWithFacebook } = await import("@/utils/firebase")
		await signInWithFacebook()
		router.push(RoutePaths.SIGNUP)
	} catch (error) {
		alreadyInUse.value = true
	}
}
</script>

<template>
	<div class="my-4">
		<p v-if="alreadyInUse" class="mb-1 text-xs text-red-500">
			Email already in use
		</p>
		<button
			class="flex w-full cursor-pointer items-center justify-center rounded bg-[#0095f6] p-2 text-white"
			:class="[alreadyInUse ? 'bg-red-500' : 'bg-[#0095f6]']"
			@click="signWithFacebook"
		>
			<div class="rounded-sm bg-white p-1">
				<img src="/facebook-white.svg" alt="facebook" class="h-4 w-4" />
			</div>
			<span class="ml-2">Log in with Facebook</span>
		</button>
	</div>
</template>
