import { defineStore } from "pinia"
import { reactive } from "vue"

import { auth } from "./firebase"
export const useUserStore = defineStore("counter", () => {
	const user = reactive<{ isAuthenticated: null | boolean }>({
		isAuthenticated: null
	})

	const authenficate = () => {
		const firebaseUser = auth.currentUser
		setTimeout(() => {
			firebaseUser
				? (user.isAuthenticated = true)
				: (user.isAuthenticated = true)
		}, 500)
	}
	return { user, authenficate }
})
