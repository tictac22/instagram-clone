import {
	collection,
	DocumentData,
	getDocs,
	query,
	where
} from "firebase/firestore"
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
		data.push(doc.data())
	})
	return data
}
