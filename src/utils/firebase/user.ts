import {
	collection,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	orderBy,
	query,
	where
} from "firebase/firestore"
import { Author, Post } from "../types"
import { db } from "./config"

export const suggestUser = async (username: string) => {
	const parsedUserName = username.toLowerCase().substring(1)
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
	return data
}

export const getUserPage = async (userId: string) => {
	const docRef = doc(db, "users", userId)

	const user = await getDoc(docRef)

	return user.data() as Author
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
