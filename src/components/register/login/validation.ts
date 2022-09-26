import { email, minLength, required } from "@vuelidate/validators"

export const logInRules = {
	email: {
		required,
		email,
		minLength: minLength(5)
	},
	password: {
		required,
		minLength: minLength(5)
	}
}

export const logInInputs = {
	email: {
		name: "email",
		placeholder: "Email",
		type: "text",
		autocomplete: "email"
	},
	password: {
		name: "password",
		placeholder: "Password",
		type: "password",
		autocomplete: "current-password"
	}
}
