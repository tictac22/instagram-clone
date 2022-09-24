<script setup lang="ts">
import useVuelidate from "@vuelidate/core"
import { email, minLength, required } from "@vuelidate/validators"
import { computed, reactive, ref } from "vue"
import Agreement from "./agreement.vue"

import { signUp } from "@/utils/firebase"
import FormInput from "../formInput.vue"
const state = reactive({
	email: "",
	fullName: "",
	username: "",
	password: ""
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
	await signUp({
		...state
	})
}

const inputs = {
	email: {
		name: "email",
		placeholder: "Email",
		type: "text"
	},
	fullName: {
		name: "fullName",
		placeholder: "Full Name",
		type: "text"
	},
	username: {
		name: "username",
		placeholder: "Username",
		type: "text"
	},
	password: {
		name: "password",
		placeholder: "Password",
		type: "password"
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
				v-model="state[input.name]"
				:error="form[input.name].$errors[0]?.$message || null"
				:type="input.type"
				:invalid="form[input.name].$invalid"
			/>
		</div>
		<Agreement />
		<button
			type="submit"
			:disabled="form.$invalid"
			:class="[form.$invalid ? 'bg-[#0095f64d]' : 'bg-[#0095f6]']"
			class="bg-[#0095f6] text-white rounded my-3 py-1 w-full cursor-pointer"
		>
			Next
		</button>
	</form>
</template>
