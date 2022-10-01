import { InjectionKey, ref } from "vue"
const currentSlider = ref(0)

export const key = Symbol() as InjectionKey<{
	currentSlider: typeof currentSlider
	nextSlider: () => void
	prevSlider: () => void
	setSlider: (index: number) => void
}>
