<script setup lang="ts">
import useVuelidate from "@vuelidate/core"
import { reactive, ref } from "vue"
import Agreement from "./agreement.vue"

import Spin from "@/components/tools/spin.vue"
import { useUserStore } from "@/utils/pinia"
import { EventWithTarget } from "@/utils/types"
import { useRouter } from "vue-router"
import FormInput from "../formInput.vue"
import { signUpInputs, signUpRules } from "./validation"
const router = useRouter()
const state = reactive({
	email: "test@test9.com",
	fullName: "Marica",
	userName: "maricarmenmelita52",
	password: "123456",
	isLoading: false,
	file: ""
})
const $externalResults = ref({})

const form = useVuelidate(signUpRules, state, { $externalResults })
const { authenficate } = useUserStore()
const submit = async () => {
	form.value.$clearExternalResults()
	state.isLoading = true
	try {
		const { signUp } = await import("@/utils/firebase")
		await signUp({
			...state,
			photoUrl: state.file
		})
		await authenficate()
		router.push("/")
	} catch (error) {
		//@ts-ignore
		$externalResults.value = error.data
		state.isLoading = false
	}
}
const divPreview = ref<HTMLDivElement | null>(null)
const handleFile = (event: Event) => {
	const target = (event as EventWithTarget).target
	const file = target.files![0]
	const url = URL.createObjectURL(file)
	divPreview.value!.style.backgroundImage = `url(${url})`

	state.file = url
}
</script>
<template>
	<form @submit.prevent="submit">
		<div class="mt-6 flex flex-col">
			<div class="text-center">
				<div
					ref="divPreview"
					class="relative m-auto h-9 w-9 rounded-full bg-cover bg-no-repeat text-center"
					:class="[state.file ? '' : 'bg-[url(/default.jpg)]']"
					style="background-position: center"
				>
					<input
						class="top-o absolute left-0 h-full w-full cursor-pointer text-[0px] opacity-0"
						type="file"
						@change="handleFile"
					/>
				</div>
				<p class="mt-1 flex flex-col items-center">
					<span class="">Select image</span>
					<span class="text-[8px]"
						>You won't be able to change it*</span
					>
				</p>
			</div>
			<FormInput
				v-for="input in signUpInputs"
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
		</div>
		<Agreement />
		<button
			type="submit"
			:disabled="form.$invalid || state.isLoading"
			:class="[form.$invalid ? 'bg-[#0095f64d]' : 'bg-[#0095f6]']"
			class="my-3 flex w-full cursor-pointer items-center justify-center rounded bg-[#0095f6] py-1 text-white"
		>
			<span v-if="!state.isLoading">Next</span> <Spin v-else />
		</button>
	</form>
</template>
