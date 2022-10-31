import {
	collection,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	increment,
	limit,
	orderBy,
	query,
	QueryDocumentSnapshot,
	startAfter,
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
	} as Author
}

export const getUserPosts = async (
	userId: string,

	lastVisibleDoc: QueryDocumentSnapshot<DocumentData> | null = null
) => {
	if (!userId)
		return {
			posts: [] as Post[],
			lastVisible: null
		}
	const postCollection = collection(db, "posts")
	let q = null
	if (lastVisibleDoc) {
		q = query(
			postCollection,
			orderBy("createdAt", "desc"),
			where("uid", "==", userId),
			startAfter(lastVisibleDoc),
			limit(9)
		)
	} else {
		q = query(
			postCollection,
			orderBy("createdAt", "desc"),
			where("uid", "==", userId),
			limit(9)
		)
	}
	const querySnapshot = await getDocs(q)
	const posts: Post[] = []

	const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
	//@ts-ignore
	querySnapshot.forEach(doc => posts.push({ id: doc.id, ...doc.data() }))
	return {
		posts,
		lastVisible: lastVisible ?? null
	}
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
