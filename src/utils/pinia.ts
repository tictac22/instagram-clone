import { defineStore } from "pinia"
import { reactive } from "vue"

type User = {
	userName: string
	fullName: string
	uid: string
	photoUrl: string
}
export const useUserStore = defineStore("counter", () => {
	const user = reactive<{ isAuthenticated: null | boolean; data: User }>({
		isAuthenticated: null,
		data: {
			userName: "",
			fullName: "",
			uid: ""
		}
	})

	const setUser = (isAuthenticated: boolean, userData: User) => {
		user.isAuthenticated = isAuthenticated
		user.data = userData
	}
	const authenficate = async () => {
		const { auth, getUser } = await import("./firebase")
		const { onAuthStateChanged } = await import("firebase/auth")

		onAuthStateChanged(auth, async firebaseUser => {
			await delay(200)
			if (!firebaseUser) return (user.isAuthenticated = false)
			if (firebaseUser?.providerData[0].providerId === "facebook.com") {
				const userData = await getUser(firebaseUser!.uid)!
				console.log(firebaseUser)
				if (!userData) {
					user.data = {
						uid: firebaseUser!.uid,
						fullName: firebaseUser!.displayName,
						photoUrl: firebaseUser!.photoURL ?? ""
					}
					return (user.isAuthenticated = false)
				}
				user.data = {
					uid: firebaseUser!.uid,
					...userData
				}
				return (user.isAuthenticated = true)
			}
			const userData = await getUser(firebaseUser!.uid)!
			user.data = userData
			user.isAuthenticated = true
		})
	}
	return { user, authenficate, setUser }
})

const delay = (time: number) =>
	new Promise(resolve => {
		setTimeout(resolve, time)
	})
