<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const alreadyInUse = ref(false)
const signWithFacebook = async () => {
	try {
		const { signInWithFacebook } = await import("@/utils/firebase")
		await signInWithFacebook()
		router.push("/")
	} catch (error) {
		alreadyInUse.value = true
	}
}
</script>

<template>
	<div class="my-4">
		<p class="text-xs text-red-500 mb-1" v-if="alreadyInUse">
			Email already in use
		</p>
		<button
			@click="signWithFacebook"
			class="text-white bg-[#0095f6] flex items-center w-full justify-center rounded p-2 cursor-pointer"
			:class="[alreadyInUse ? 'bg-red-500' : 'bg-[#0095f6]']"
		>
			<div class="bg-white p-1 rounded-sm">
				<img src="/facebook-white.svg" alt="facebook" class="w-4 h-4" />
			</div>
			<span class="ml-2">Log in with Facebook</span>
		</button>
	</div>
</template>
