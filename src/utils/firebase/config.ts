// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
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
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth()

export class CustomError extends Error {
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

export const enum ErrorMessages {
	email = "Email is already in use",
	username = "Username is already in use",
	password = "password is incorrect"
}

export type SignUp = {
	email: string
	password: string
	userName: string
	fullName: string
	photoUrl: string
}

export type Login = {
	email: string
	password: string
}
