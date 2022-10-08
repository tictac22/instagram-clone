import { minLength, required } from "@vuelidate/validators"

export const instagramRules = {
	fullName: {
		required,
		minLength: minLength(5)
	},
	userName: {
		required,
		minLength: minLength(5)
	}
}

export const instagramInputs = {
	fullName: {
		name: "fullName",
		placeholder: "Full Name",
		type: "text",
		autocomplete: "off"
	},
	userName: {
		name: "userName",
		placeholder: "Username",
		type: "text",
		autocomplete: "off"
	}
}
