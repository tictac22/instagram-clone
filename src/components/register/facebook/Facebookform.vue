<script lang="ts" setup>
import { useUserStore } from "@/utils/pinia"
import useVuelidate from "@vuelidate/core"
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import FormInput from "../formInput.vue"
import Spin from "../spin.vue"
import { instagramInputs, instagramRules } from "./validation"
const router = useRouter()
const { user, authenficate } = useUserStore()

const state = reactive({
	fullName: user.data.fullName,
	userName: "",
	isLoading: false,
	isError: false
})
const $externalResults = ref({})

const form = useVuelidate(instagramRules, state, { $externalResults })
const submit = async () => {
	state.isLoading = false
	state.isLoading = true
	try {
		const { setSignUpFacebookData } = await import("@/utils/firebase")
		await setSignUpFacebookData({
			...state,
			uid: user.data.uid
		})
		await authenficate()
		router.push("/")
	} catch (error) {
		//@ts-ignore
		$externalResults.value = error.data
	} finally {
		state.isLoading = false
	}
}
if (user.data.userName) router.push("/")
</script>
<template>
	<form @submit.prevent="submit">
		<div class="mt-6 flex flex-col">
			<p class="mb-4 font-medium">Please continue your registartion.</p>
			<FormInput
				v-for="input in instagramInputs"
				:key="input.name"
				v-model="form[input.name].$model"
				:touch="form[input.name].$touch"
				:placeholder="input.placeholder"
				:error="
					form[input.name].$errors[0]?.$message ||
					form[input.name].$externalResults[0]?.$message ||
					null
				"
				:type="input.type"
				:invalid="form[input.name].$invalid"
				:autocomplete="input.autocomplete"
			/>
			<button
				type="submit"
				class="my-3 flex items-center justify-center rounded py-1 text-white"
				:disabled="form.$invalid || state.isLoading"
				:class="[form.$invalid ? 'bg-[#0095f64d]' : 'bg-[#0095f6]']"
			>
				<Spin v-if="state.isLoading" />
				<span v-else>Log In</span>
			</button>
			<p
				v-if="state.isError"
				class="m-auto my-1 max-w-[230px] text-center text-red-500"
			>
				Sorry, your password or email was incorrect. Please double-check
				form values
			</p>
		</div>
	</form>
</template>
