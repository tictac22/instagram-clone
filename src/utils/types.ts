export interface EventWithValue extends Event {
	value: string
}

export type Author = {
	uid: string
	fullName: string
	photoUrl: string
	userName: string
}
export type Post = {
	text: string
	id: string
	uid: string
	images: string[]
	author: Author
	createdAt: {
		seconds: number
	}
}
