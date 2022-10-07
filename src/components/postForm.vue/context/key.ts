import { InjectionKey, ref } from "vue"

const fromStep = ref(0)
const files = ref<string[]>([])
const croppedFiles = ref<string[]>([])

export const key = Symbol() as InjectionKey<{
	files: typeof files
	croppedFiles: typeof croppedFiles
	formStep: typeof fromStep
	nextFormStep: () => void
	prevFormStep: () => void
	uploadFileToCropper: (file: File) => void
	swapFiles: (from: number, to: number) => void
	deleteFile: (index: number) => void
	saveCropImages: (images: string[]) => void
	saveBlobedFiles: (files: string[]) => string[]
}>
