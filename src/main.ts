import { createApp } from "vue"
import App from "./App.vue"
import "./style.css"

import { library } from "@fortawesome/fontawesome-svg-core"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import { createPinia } from "pinia"
import { router } from "./route"

import {
	faBookmark,
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
	faXmark
)

const clickOutside = {
	//@ts-ignore
	beforeMount: (el, binding) => {
		//@ts-ignore
		el.clickOutsideEvent = (event) => {
			// here I check that click was outside the el and his children
			if (!(el == event.target || el.contains(event.target))) {
				// and if it did, call method provided in attribute value
				binding.value()
			}
		}
		document.addEventListener("click", el.clickOutsideEvent)
	},
	//@ts-ignore
	unmounted: (el) => {
		document.removeEventListener("click", el.clickOutsideEvent)
	}
}

createApp(App)
	.use(router)
	.use(createPinia())
	.component("font-awesome-icon", FontAwesomeIcon)
	.directive("click-outside", clickOutside)
	.mount("#app")
