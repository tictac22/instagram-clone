import Dropdown from "@/components/header/dropdown.vue"
import { describe, expect, it } from "vitest"
import { renderWithPinia } from "./helpers/renderWithPinia"

import { mount } from "@vue/test-utils"
import { globalParams } from "./helpers/dropdown.constants"

const enum dataAttrs {
	dataFalse = "[data-test='false']",
	dataTrue = "[data-test='true']",
	clickId = "#click"
}

describe("Dropdown component", () => {
	it("dropdown succesffuly mounts", async () => {
		const wrapper = mount(Dropdown, {
			global: {
				...globalParams({ id: "" }),
				plugins: [renderWithPinia(mockState(""))]
			}
		})
		expect(wrapper.find(dataAttrs.dataFalse).exists()).toBeTruthy()
	})

	it("dropdown succesffuly mounts with equal id", async () => {
		const wrapper = mount(Dropdown, {
			global: {
				...globalParams({ id: "1" }),
				plugins: [renderWithPinia(mockState("1"))]
			}
		})
		expect(wrapper.element).toMatchSnapshot()
	})

	it("renders dropdown", async () => {
		const wrapper = mount(Dropdown, {
			global: {
				plugins: [renderWithPinia(mockState(""))],
				...globalParams({ id: "1" })
			}
		})

		await wrapper.find(dataAttrs.clickId).trigger("click")
		expect(wrapper.find(dataAttrs.dataTrue).exists()).toBeTruthy()
	})
})

function mockState(uid: string) {
	return {
		stateName: "counter",
		state: {
			user: {
				photoUrl: "",
				uid
			}
		}
	}
}
