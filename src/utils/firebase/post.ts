import {
	addDoc,
	collection,
	doc,
	DocumentData,
	documentId,
	getDoc,
	getDocs,
	increment,
	limit,
	orderBy,
	query,
	QueryDocumentSnapshot,
	startAfter,
	Timestamp,
	updateDoc,
	where
} from "firebase/firestore"
import { Author, Post } from "../types"
import { db } from "./config"

export const getUserHomePosts = async (
	subscribedIds: string[],
	lastVisibleDoc: QueryDocumentSnapshot<DocumentData> | null = null
) => {
	if (!subscribedIds || subscribedIds.length <= 0)
		return { posts: [] as Post[], lastVisible: null }
	const postCollection = collection(db, "posts")
	let q = null
	if (lastVisibleDoc) {
		q = query(
			postCollection,
			orderBy("createdAt", "desc"),
			where("uid", "in", subscribedIds),
			limit(5),
			startAfter(lastVisibleDoc)
		)
	} else {
		q = query(
			postCollection,
			orderBy("createdAt", "desc"),
			where("uid", "in", subscribedIds),
			limit(5)
		)
	}
	const querySnapshot = await getDocs(q)
	const posts: Post[] = []
	const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
	//@ts-ignore
	querySnapshot.forEach(doc => posts.push({ id: doc.id, ...doc.data() }))
	if (posts.length > 0) {
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
	}

	return {
		posts: posts ?? [],
		lastVisible: lastVisible ?? null
	}
}

export const getExplorePosts = async () => {
	const postCollection = collection(db, "posts")
	const q = query(postCollection, orderBy("createdAt", "desc"))
	const querySnapshot = await getDocs(q)
	const posts: Post[] = []
	//@ts-ignore
	querySnapshot.forEach(doc => posts.push({ id: doc.id, ...doc.data() }))
	return posts
}

export const getPost = async (id: string, isMorePosts?: boolean) => {
	const postRef = doc(db, "posts", id)

	const postRequest = await getDoc(postRef)
	const post = postRequest.data() as Post
	const userRef = doc(db, "users", post.uid)

	const userRequest = await getDoc(userRef)
	const user = userRequest.data() as Author
	const morePosts = [] as Post[]
	if (isMorePosts) {
		const collectionPosts = collection(db, "posts")
		const q = query(
			collectionPosts,
			where(documentId(), "!=", postRequest.id),
			where("uid", "==", userRequest.id),
			limit(6)
		)
		const morePostsResponse = await getDocs(q)
		morePostsResponse.forEach(post =>
			//@ts-ignore
			morePosts.push({ ...post.data(), id: post.id })
		)
	}
	return {
		post: {
			...post,
			id: postRequest.id
		},
		user: {
			...user,
			uid: userRequest.id
		},
		morePosts
	}
}

interface ICreatePost {
	images: string[]
	uid: string
	text: string
	authorUserName: string
}

export const createPost = async (postData: ICreatePost) => {
	const userRef = doc(db, "users", postData.uid)
	await updateDoc(userRef, {
		postsNumber: increment(1)
	})

	const collections = collection(db, "posts")
	const data = await addDoc(collections, {
		...postData,
		createdAt: Timestamp.fromDate(new Date()),
		likes: 0,
		comments: 0
	})
	return data
}
export const likePost = async (
	id: string,
	postId: string,
	likes: string[],
	liked: boolean
) => {
	const post = doc(db, "posts", postId)
	if (liked) {
		await updateDoc(post, {
			likes: increment(-1)
		})
	} else {
		await updateDoc(post, {
			likes: increment(1)
		})
	}
	const userRef = doc(db, "users", id)
	updateDoc(userRef, {
		likes: [...likes]
	})
}
