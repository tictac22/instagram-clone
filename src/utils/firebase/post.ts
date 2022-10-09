import { addDoc, collection } from "firebase/firestore"
import { db } from "./config"

interface ICreatePost {
	images: string[]
	uid: string
	text: string
}
export const createPost = async (postData: ICreatePost) => {
	const collections = collection(db, "posts")
	const data = await addDoc(collections, {
		...postData
	})
	console.log("createpost", data)
	return data
}
