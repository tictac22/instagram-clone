import {
	addDoc,
	collection,
	DocumentData,
	getDocs,
	query,
	where
} from "firebase/firestore"
import { db } from "./config"

interface ICreatePost {
	images: string[]
	creatorUid: string
	text: string
}
export const createPost = async (postData: ICreatePost) => {
	const collections = collection(db, "posts")
	const data = await addDoc(collections, {
		...postData
	})
	return data
}

export const getUserHomePosts = async (subscribedIds: string[]) => {
	const collections = collection(db, "posts")
	const q = query(collections, where("creatorUid", "in", subscribedIds))

	const querySnapshot = await getDocs(q)

	const posts: DocumentData[] = []
	querySnapshot.forEach(doc => posts.push({ uid: doc.id, ...doc.data() }))

	return posts
}
