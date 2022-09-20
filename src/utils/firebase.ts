// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
	apiKey: import.meta.env.apiKey,
	authDomain: import.meta.env.authDomain,
	projectId: import.meta.env.projectId,
	storageBucket: import.meta.env.storageBucket,
	messagingSenderId: import.meta.env.messagingSenderId,
	appId: import.meta.env.appId,
	measurementId: import.meta.env.measurementId
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth()
