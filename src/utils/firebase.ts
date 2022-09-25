// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

import {
	createUserWithEmailAndPassword,
	deleteUser,
	FacebookAuthProvider,
	getAuth,
	signInWithPopup
} from "firebase/auth"
import {
	collection,
	doc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	where
} from "firebase/firestore"
const firebaseConfig = {
	apiKey: import.meta.env.VITE_apiKey,
	authDomain: import.meta.env.VITE_authDomain,
	projectId: import.meta.env.VITE_projectId,
	storageBucket: import.meta.env.VITE_storageBucket,
	messagingSenderId: import.meta.env.VITE_messagingSenderId,
	appId: import.meta.env.VITE_appId,
	measurementId: import.meta.env.VITE_measurementId
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth()

type SignUp = {
	email: string
	password: string
	username: string
	fullName: string
}

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

class CustomError extends Error {
	status: number
	data: object
	constructor(message: string, field: string) {
		super(message)
		this.status = 404
		this.data = {
			[field]: [message]
		}
	}
}

const enum ErrorMessages {
	email = "Email is already in use",
	username = "Username is already in use"
}
