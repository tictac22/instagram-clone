<script setup lang="ts">
import useVuelidate from "@vuelidate/core"
import { email, minLength, required } from "@vuelidate/validators"
import { computed, reactive, ref } from "vue"
import Agreement from "./agreement.vue"

import { useRouter } from "vue-router"
import FormInput from "../formInput.vue"
import Spin from "../spin.vue"

const router = useRouter()
const state = reactive({
	email: "",
	fullName: "",
	username: "",
	password: "",
	isLoading: false
})
const $externalResults = ref({})
const rules = computed(() => ({
	email: {
		required,
		email,
		minLength: minLength(5)
	},
	fullName: {
		required,
		minLength: minLength(5)
	},
	username: {
		required,
		minLength: minLength(5)
	},
	password: {
		required,
		minLength: minLength(5)
	}
}))
const form = useVuelidate(rules, state, { $externalResults })

const submit = async () => {
	form.value.$clearExternalResults()
	state.isLoading = true
	try {
		const { signUp } = await import("@/utils/firebase")
		await signUp({
			...state
		})
		router.push("/")
	} catch (error) {
		console.log(error, error.data)
		$externalResults.value = error.data
		state.isLoading = false
	}
}

const inputs = {
	email: {
		name: "email",
		placeholder: "Email",
		type: "text",
		autocomplete: "off"
	},
	fullName: {
		name: "fullName",
		placeholder: "Full Name",
		type: "text",
		autocomplete: "off"
	},
	username: {
		name: "username",
		placeholder: "Username",
		type: "text",
		autocomplete: "off"
	},
	password: {
		name: "password",
		placeholder: "Password",
		type: "password",
		autocomplete: "new-password"
	}
}
</script>
<template>
	<form v-on:submit.prevent="submit">
		<div class="mt-6 flex flex-col">
			<FormInput
				v-for="input in inputs"
				:touch="form[input.name].$touch"
				:placeholder="input.placeholder"
				v-model="form[input.name].$model"
				:error="
					form[input.name].$errors[0]?.$message ||
					form[input.name].$externalResults[0]?.$message ||
					null
				"
				:type="input.type"
				:invalid="form[input.name].$invalid"
				:autocomplete="input.autocomplete"
			/>
		</div>
		<Agreement />
		<button
			type="submit"
			:disabled="form.$invalid || state.isLoading"
			:class="[form.$invalid ? 'bg-[#0095f64d]' : 'bg-[#0095f6]']"
			class="bg-[#0095f6] text-white rounded my-3 py-1 w-full cursor-pointer flex items-center justify-center"
		>
			<span v-if="!state.isLoading">Next</span> <Spin v-else />
		</button>
	</form>
</template>
