import { defineStore } from "pinia"
import { reactive, ref } from "vue"

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
		const { likePost } = await import("@/utils/firebase")

		const isLiked = user.data.likes.find(item => item === id)
		if (isLiked) {
			const index = user.data.likes.indexOf(isLiked)
			user.data.likes.splice(index, 1)
			likePost(user.data.uid, id, user.data.likes, true)
		} else {
			user.data.likes.push(id)
			likePost(user.data.uid, id, user.data.likes, false)
		}
	}

	const setUser = (isAuthenticated: boolean, userData: User) => {
		user.isAuthenticated = isAuthenticated
		user.data = userData
	}
	const authenficate = async () => {
		const { auth, getUser } = await import("./firebase")
		const { onAuthStateChanged } = await import("firebase/auth")

		onAuthStateChanged(auth, async firebaseUser => {
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
	const logOut = async () => {
		const { logOut: firestoreLogOut } = await import("./firebase")
		await firestoreLogOut()
		user.data = {} as User
		user.isAuthenticated = false
	}
	return { user, authenficate, setUser, handleLike, logOut }
})

export const useLoadingBar = defineStore("loadingbar", () => {
	const loading = ref(false)

	const setLoading = (loadingValue: boolean) => (loading.value = loadingValue)

	return {
		loading,
		setLoading
	}
})
