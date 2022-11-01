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
	const handleSubscribe = async (id: string) => {
		const { subscribe } = await import("@/utils/firebase")
		const isSubscribed = user.data.subscribed.find(item => item === id)
		if (isSubscribed) {
			const index = user.data.likes.indexOf(isSubscribed)
			user.data.subscribed.splice(index, 1)
			subscribe({
				isSubscribed: true,
				userId: user.data.uid,
				subscribedId: id,
				usersSubscribes: user.data.subscribed
			})
		} else {
			user.data.subscribed.length === 10
				? (user.data.subscribed[user.data.subscribed.length - 1] = id)
				: user.data.subscribed.push(id)
			subscribe({
				isSubscribed: false,
				userId: user.data.uid,
				subscribedId: id,
				usersSubscribes: user.data.subscribed
			})
		}
	}
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
			console.log(firebaseUser)
			const userData = await getUser(firebaseUser!.uid)!
			console.log(userData)
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
	return { user, authenficate, setUser, handleLike, logOut, handleSubscribe }
})

export const useLoadingBar = defineStore("loadingbar", () => {
	const loading = ref(false)

	const setLoading = (loadingValue: boolean) => (loading.value = loadingValue)

	return {
		loading,
		setLoading
	}
})
