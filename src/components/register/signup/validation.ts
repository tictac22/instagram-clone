import { email, minLength, required } from "@vuelidate/validators"

export const signUpRules = {
	email: {
		required,
		email,
		minLength: minLength(5)
	},
	fullName: {
		required,
		minLength: minLength(5)
	},
	userName: {
		required,
		minLength: minLength(5)
	},
	password: {
		required,
		minLength: minLength(5)
	}
}

export const signUpInputs = {
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
	userName: {
		name: "userName",
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
