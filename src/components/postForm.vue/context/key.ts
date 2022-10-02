import { InjectionKey, ref } from "vue"
const currentSlider = ref(0)
const files = ref<string[]>([])

export const key = Symbol() as InjectionKey<{
	currentSlider: typeof currentSlider
	nextSlider: () => void
	prevSlider: () => void
	setSlider: (index: number) => void
	files: typeof files
	uploadFileToCropper: (file: File) => void
	swapFiles: (from: number, to: number) => void
	deleteFile: (index: number) => void
}>
