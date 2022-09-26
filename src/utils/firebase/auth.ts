import {
	createUserWithEmailAndPassword,
	deleteUser,
	FacebookAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup
} from "firebase/auth"
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	where
} from "firebase/firestore"
import { auth, CustomError, db, ErrorMessages, Login, SignUp } from "./config"

export const signInWithFacebook = async () => {
	try {
		const provider = new FacebookAuthProvider()
		const result = await signInWithPopup(auth, provider)

		const usersCollectionRef = doc(db, "users", result.user.uid)
		await setDoc(usersCollectionRef, {
			userId: result.user.uid
		})
	} catch (error) {
		console.log(error)
		throw new CustomError(ErrorMessages.email, "email")
	}
}
export const signUp = async ({
	email,
	password,
	username,
	fullName
}: SignUp) => {
	try {
		const registration = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		const isTaken = await isNameTaken(username)
		if (isTaken) {
			await deleteUser(registration.user)
			throw new CustomError(ErrorMessages.username, "username")
		}
		const usersCollectionRef = doc(db, "users", registration.user.uid)
		await setDoc(usersCollectionRef, {
			userId: registration.user.uid,
			username,
			fullName
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
		await signInWithEmailAndPassword(auth, email, password)
	} catch (error) {
		const message = error.message
		if (message === firebaseError.email) {
			throw new CustomError(ErrorMessages.email, "email")
		}
		throw new CustomError(ErrorMessages.password, "email")
	}
}

const isNameTaken = async (username: string) => {
	try {
		const usersCollectionRef = collection(db, "users")
		const q = query(usersCollectionRef, where("username", "==", username))

		const querySnapshot = await getDocs(q)

		const users = []
		querySnapshot.forEach((item) => {
			users.push({ ...item.data(), id: item.id })
		})
		if (users.length >= 1) return true
		return false
	} catch (error) {
		console.error(error)
	}
}

const enum firebaseError {
	email = "Firebase: Error (auth/user-not-found).",
	password = "Firebase: Error (auth/wrong-password)."
}
