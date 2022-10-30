import {
	collection,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	increment,
	orderBy,
	query,
	updateDoc,
	where
} from "firebase/firestore"
import { Author, Post } from "../types"
import { db } from "./config"

export const suggestUser = async (username: string, inHeader?: boolean) => {
	let parsedUserName = username.toLowerCase()
	inHeader ? (parsedUserName = parsedUserName.substring(1)) : ""
	const q = query(
		collection(db, "users"),
		where("userName", ">=", parsedUserName),
		where("userName", "<=", parsedUserName + "\uf8ff")
	)
	const users = await getDocs(q)
	const data: DocumentData[] = []
	users.forEach(doc => {
		data.push({ uid: doc.id, ...doc.data() })
	})
	return data as Author[]
}

export const getUserPage = async (userId: string) => {
	const docRef = doc(db, "users", userId)

	const user = await getDoc(docRef)

	return {
		uid: user.id,
		...user.data()
	}
}

export const getUserPosts = async (userId: string) => {
	if (!userId) return
	const postCollection = collection(db, "posts")
	const q = query(
		postCollection,
		orderBy("createdAt", "desc"),
		where("uid", "==", userId)
	)
	const querySnapshot = await getDocs(q)
	const posts: Post[] = []

	//@ts-ignore
	querySnapshot.forEach(doc => posts.push({ id: doc.id, ...doc.data() }))
	return posts
}

type HandleSubscribe = {
	userId: string
	subscribedId: string
	usersSubscribes: string[]
	isSubscribed: boolean
}
export const subscribe = async ({
	userId,
	subscribedId,
	isSubscribed,
	usersSubscribes
}: HandleSubscribe) => {
	const subcribeUser = doc(db, "users", subscribedId)
	if (isSubscribed) {
		await updateDoc(subcribeUser, {
			followers: increment(-1)
		})
	} else {
		await updateDoc(subcribeUser, {
			followers: increment(1)
		})
	}
	const userRef = doc(db, "users", userId)
	updateDoc(userRef, {
		subscribed: [...usersSubscribes]
	})
}
