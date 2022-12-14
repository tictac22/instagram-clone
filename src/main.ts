import { createApp } from "vue"
import App from "./App.vue"
import "./style.css"

import { library } from "@fortawesome/fontawesome-svg-core"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import { createPinia } from "pinia"
import { router } from "./route"

import {
	faArrowLeft,
	faBookmark,
	faChevronLeft,
	faChevronRight,
	faCircleCheck,
	faCircleXmark,
	faComment,
	faCompass,
	faHeart,
	faHouse,
	faMagnifyingGlass,
	faSmile,
	faSquarePlus,
	faXmark
} from "@fortawesome/free-solid-svg-icons"
import { createHead } from "@vueuse/head"

library.add(
	faHouse,
	faMagnifyingGlass,
	faCircleXmark,
	faSquarePlus,
	faCompass,
	faHeart,
	faComment,
	faBookmark,
	faSmile,
	faCircleCheck,
	faXmark,
	faChevronRight,
	faChevronLeft,
	faArrowLeft
)

const clickOutside = {
	//@ts-ignore
	beforeMount: (el, binding) => {
		//@ts-ignore
		el.clickOutsideEvent = event => {
			// here I check that click was outside the el and his children
			if (!(el == event.target || el.contains(event.target))) {
				// and if it did, call method provided in attribute value
				binding.value()
			}
		}
		document.addEventListener("pointerdown", el.clickOutsideEvent)
	},
	//@ts-ignore
	unmounted: el => {
		document.removeEventListener("pointerdown", el.clickOutsideEvent)
	}
}
const head = createHead()

createApp(App)
	.use(createPinia())
	.use(router)
	.use(head)
	.component("font-awesome-icon", FontAwesomeIcon)
	.directive("click-outside", clickOutside)
	.mount("#app")
