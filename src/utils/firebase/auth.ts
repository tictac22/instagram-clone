import {
	createUserWithEmailAndPassword,
	deleteUser,
	FacebookAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut
} from "firebase/auth"
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	where
} from "firebase/firestore"
import { auth, CustomError, db, ErrorMessages, Login, SignUp } from "./config"
import { savePhotoUrl } from "./storage"

export const logOut = async () => {
	return await signOut(auth)
}

export const signInWithFacebook = async () => {
	try {
		const provider = new FacebookAuthProvider()
		await signInWithPopup(auth, provider)
	} catch (error) {
		throw new CustomError(ErrorMessages.email, "email")
	}
}
export const setSignUpFacebookData = async ({
	uid,
	fullName,
	userName,
	photoUrl
}: {
	uid: string
	fullName: string
	userName: string
	photoUrl: string
}) => {
	const isTaken = await isNameTaken(userName)
	if (isTaken) {
		throw new CustomError(ErrorMessages.username, "userName")
	}
	const usersCollectionRef = doc(db, "users", uid)

	const user = await setDoc(usersCollectionRef, {
		fullName,
		userName,
		photoUrl,
		likes: [],
		subscribed: [],
		followers: 0
	})
	return user
}
export const signUp = async ({
	email,
	password,
	userName,
	fullName,
	photoUrl = ""
}: SignUp) => {
	try {
		const registration = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		const isTaken = await isNameTaken(userName)
		if (isTaken) {
			await deleteUser(registration.user)
			throw new CustomError(ErrorMessages.username, "username")
		}
		const usersCollectionRef = doc(db, "users", registration.user.uid)
		const image = photoUrl.includes("blob")
			? await savePhotoUrl(photoUrl)
			: ""
		await setDoc(usersCollectionRef, {
			userId: registration.user.uid,
			userName,
			fullName,
			likes: [],
			photoUrl: image,
			subscribed: [],
			followers: 0
		})
	} catch (error) {
		if (error instanceof CustomError) {
			throw error
		}
		throw new CustomError(ErrorMessages.email, "email")
	}
}

export const logIn = async ({ email, password }: Login) => {
	try {
		const user = await signInWithEmailAndPassword(auth, email, password)
		return user
	} catch (error) {
		//@ts-ignore
		const message = error.message
		if (message === firebaseError.email) {
			throw new CustomError(ErrorMessages.email, "email")
		}
		throw new CustomError(ErrorMessages.password, "email")
	}
}

async function isNameTaken(username: string) {
	try {
		const usersCollectionRef = collection(db, "users")
		const q = query(usersCollectionRef, where("username", "==", username))

		const querySnapshot = await getDocs(q)

		const users = []
		querySnapshot.forEach(item => {
			users.push({ ...item.data(), id: item.id })
		})
		if (users.length >= 1) return true
		return false
	} catch (error) {
		//eslint-disable-next-line
		console.error(error)
	}
}

const enum firebaseError {
	username = "Username is already in use",
	email = "Firebase: Error (auth/user-not-found).",
	password = "Firebase: Error (auth/wrong-password)."
}

export const getUser = async (userId: string) => {
	const usersCollectionRef = doc(db, "users", userId)
	const user = await getDoc(usersCollectionRef)
	return user.data() ?? false
}
