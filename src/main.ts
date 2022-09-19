import { createApp } from "vue"
import App from "./App.vue"
import "./style.css"

import { library } from "@fortawesome/fontawesome-svg-core"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import {
	faBookmark,
	faCircleXmark,
	faComment,
	faCompass,
	faHeart,
	faHouse,
	faMagnifyingGlass,
	faSmile,
	faSquarePlus
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
	faSmile
)

const clickOutside = {
	beforeMount: (el, binding) => {
		el.clickOutsideEvent = (event) => {
			// here I check that click was outside the el and his children
			if (!(el == event.target || el.contains(event.target))) {
				// and if it did, call method provided in attribute value
				binding.value()
			}
		}
		document.addEventListener("click", el.clickOutsideEvent)
	},
	unmounted: (el) => {
		document.removeEventListener("click", el.clickOutsideEvent)
	}
}

createApp(App)
	.component("font-awesome-icon", FontAwesomeIcon)
	.directive("click-outside", clickOutside)
	.mount("#app")
