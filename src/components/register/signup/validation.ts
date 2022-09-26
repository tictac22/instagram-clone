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
	username: {
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
