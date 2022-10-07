import { InjectionKey, ref } from "vue"
const currentImage = ref(0)

export const key = Symbol() as InjectionKey<{
	currentImage: typeof currentImage
	nextCurrentImage: () => number
	prevCurrentImage: () => number
	setCurrentImage: (index: number) => number
}>
