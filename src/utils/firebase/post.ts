import {
	addDoc,
	collection,
	doc,
	documentId,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	Timestamp,
	updateDoc,
	where
} from "firebase/firestore"
import { Author, Post } from "../types"
import { db } from "./config"

export const getUserHomePosts = async (subscribedIds: string[]) => {
	if (!subscribedIds || subscribedIds.length < 0) return
	const postCollection = collection(db, "posts")
	const q = query(
		postCollection,
		orderBy("createdAt", "desc"),
		where("uid", "in", subscribedIds)
	)

	const querySnapshot = await getDocs(q)
	const posts: Post[] = []
	//@ts-ignore
	querySnapshot.forEach(doc => posts.push({ id: doc.id, ...doc.data() }))

	const userCollection = collection(db, "users")
	const notRepeatedUserUids = [...new Set(posts.map(item => item.uid))]
	const q2 = query(
		userCollection,
		where(documentId(), "in", notRepeatedUserUids)
	)
	const userSnapShot = await getDocs(q2)
	const users: Author[] = []

	//@ts-ignore
	userSnapShot.forEach(doc => users.push({ id: doc.id, ...doc.data() }))

	posts.forEach(
		//@ts-ignore
		item => (item.author = users.find(user => user.id === item.uid))
	)

	return posts
}

export const getPost = async (id: string) => {
	const postRef = doc(db, "posts", id)

	const postRequest = await getDoc(postRef)
	const post = postRequest.data() as Post

	const userRef = doc(db, "users", post.uid)

	const userRequest = await getDoc(userRef)
	const user = userRequest.data() as Author

	return {
		post: {
			...post,
			id: postRequest.id
		},
		user: {
			...user,
			uid: userRequest.id
		}
	}
}
export const getPostComments = async (id: string) => {
	if (!id) return
	const commentRef = collection(db, "posts", id, "comments")
	const q = query(commentRef, limit(20), orderBy("createdAt", "desc"))
	const querySnapshot = await getDocs(q)

	const comments = []
	querySnapshot.forEach(doc => {
		// doc.data() is never undefined for query doc snapshots
		comments.push(doc.data())
	})
	return comments
}
interface ICreatePost {
	images: string[]
	creatorUid: string
	text: string
}

export const createPost = async (postData: ICreatePost) => {
	const collections = collection(db, "posts")
	const data = await addDoc(collections, {
		...postData,
		createdAt: Timestamp.fromDate(new Date())
	})
	return data
}
export const likePost = async (id: string, likes: string[]) => {
	const userRef = doc(db, "users", id)
	updateDoc(userRef, {
		likes: [...likes]
	})
}

export const createCommentPost = async (id: string) => {
	const collections = collection(db, "posts", id, "comments")
	const data = await addDoc(collections, {
		text: "hello",
		createdAt: Timestamp.fromDate(new Date())
	})
	return data
}
