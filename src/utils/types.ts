export interface EventWithValue extends Event {
	value: string
}
export interface EventWithKeycode extends Event {
	keyCode: number
}
export interface EventWithTarget extends Event {
	target: HTMLInputElement
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
