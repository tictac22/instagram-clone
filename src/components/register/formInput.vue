<script setup lang="ts">
import { computed } from "@vue/reactivity"
import { ref } from "vue"

const props = defineProps<{
	modelValue: string
	touch: () => void
	placeholder: string
	error: string | null
	type: string
	invalid: boolean
}>()
defineEmits<{
	(e: "update:modelValue", value: string): void
}>()

const inputRef = ref<HTMLInputElement>()
const text = ref("show")
const changeType = () => {
	const input = inputRef.value!
	if (input?.type === "text") {
		input.type = "password"
		text.value = "show"
		return
	}
	input.type = "text"
	text.value = "hide"
}
const isPassword = computed(() => (props.type === "password" ? true : false))
</script>
<template>
	<div class="relative my-2">
		<input
			ref="inputRef"
			:placeholder="props.placeholder"
			class="py-1 border-b border-solid border-[#dbdbdb] placeholder:text-xs outline-none focus:border-[#a6a4a4] w-full peer placeholder-transparent"
			:class="[isPassword ? 'pr-[72px]' : 'pr-[38px]']"
			:type="props.type"
			:value="props.modelValue"
			:autocomplete="isPassword ? 'new-autocomplete' : 'off'"
			@input="
				$emit(
					'update:modelValue',
					($event.target as HTMLInputElement).value
				)
			"
			v-on:blur="props.touch"
			:id="props.placeholder"
		/>
		<label
			:for="props.placeholder"
			class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
			>{{ props.placeholder }}</label
		>
		<div
			class="absolute top-1/2 -translate-y-1/2 text-[#262626] font-medium right-2 flex items-center"
		>
			<font-awesome-icon
				v-if="props.error"
				icon="fa-solid fa-circle-xmark"
				class="text-red-500"
			/>
			<font-awesome-icon
				icon="fa-solid fa-circle-check"
				v-if="!props.invalid"
				class="text-green-600"
			/>
			<div
				v-if="isPassword && props.modelValue.length > 1"
				@click="changeType"
				class="ml-1 cursor-pointer"
			>
				{{ text }}
			</div>
		</div>
	</div>
</template>
