import {
	addDoc,
	collection,
	doc,
	getDocs,
	increment,
	limit,
	orderBy,
	query,
	Timestamp,
	updateDoc
} from "firebase/firestore"
import { Comment } from "../types"
import { db } from "./config"
type CommentData = {
	photoUrl: string
	userName: string
	id: string
	text: string
	uid: string
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
		createdAt: Timestamp.fromDate(new Date()),
		userId: data.uid
	})
	return response
}

export const getPostComments = async (id: string) => {
	if (!id) return
	const commentRef = collection(db, "posts", id, "comments")
	const q = query(commentRef, limit(20), orderBy("createdAt", "desc"))
	const querySnapshot = await getDocs(q)

	const comments: Comment[] = []
	querySnapshot.forEach(doc => {
		// doc.data() is never undefined for query doc snapshots
		comments.push({ id: doc.id, ...doc.data() })
	})
	return comments
}
