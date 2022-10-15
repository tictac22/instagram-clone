import { defineStore } from "pinia"
import { reactive } from "vue"

type User = {
	userName: string
	fullName: string
	uid: string
	photoUrl: string
	subscribed: string[]
	likes: string[]
}
export const useUserStore = defineStore("counter", () => {
	const user = reactive<{ isAuthenticated: null | boolean; data: User }>({
		isAuthenticated: null,
		data: {
			userName: "",
			fullName: "",
			uid: "",
			photoUrl: "",
			subscribed: [],
			likes: []
		}
	})

	const handleLike = async (id: string) => {
		const isLiked = user.data.likes.find(item => item === id)
		if (isLiked) {
			const index = user.data.likes.indexOf(isLiked)
			user.data.likes.splice(index, 1)
		} else {
			user.data.likes.push(id)
		}
		const { likePost } = await import("@/utils/firebase")
		likePost(user.data.uid, user.data.likes)
	}

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
				if (!userData) {
					user.data = {
						uid: firebaseUser!.uid,
						...firebaseUser!
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
			user.data = {
				uid: firebaseUser!.uid,
				...userData
			}
			user.isAuthenticated = true
		})
	}
	return { user, authenficate, setUser, handleLike }
})

const delay = (time: number) =>
	new Promise(resolve => {
		setTimeout(resolve, time)
	})
