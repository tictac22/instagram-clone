// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

import {
	createUserWithEmailAndPassword,
	deleteUser,
	getAuth
} from "firebase/auth"
import {
	addDoc,
	collection,
	getDocs,
	getFirestore,
	query,
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

export const signUp = async (signUp: SignUp) => {
	try {
		const registration = await createUserWithEmailAndPassword(
			auth,
			signUp.email,
			signUp.password
		)

		const isTaken = await isNameTaken(signUp.username)
		if (isTaken) {
			await deleteUser(registration.user)
			throw new Error("such name is already taken")
		}
		const usersCollectionRef = collection(db, "users")
		await addDoc(usersCollectionRef, {
			userId: registration.user.uid,
			username: signUp.username,
			age: 12
		})
	} catch (error) {
		console.error(error)
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
