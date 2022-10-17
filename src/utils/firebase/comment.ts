import {
	addDoc,
	collection,
	doc,
	increment,
	Timestamp,
	updateDoc
} from "firebase/firestore"
import { db } from "./config"

type CommentData = {
	photoUrl: string
	userName: string
	id: string
	text: string
}
export const createCommentPost = async (data: CommentData) => {
	const postCollection = doc(db, "posts", data.id)
	await updateDoc(postCollection, {
		comments: increment(1)
	})

	const collections = collection(db, "posts", data.id, "comments")
	const response = await addDoc(collections, {
		userName: data.userName,
		photoUrl: data.photoUrl ?? "",
		text: data.text,
		createdAt: Timestamp.fromDate(new Date())
	})
	return response
}
