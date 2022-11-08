import { beforeEach, describe, expect, it } from "vitest"

import Test from "@/components/test.vue"
import { mount, VueWrapper } from "@vue/test-utils"

const enum dataAttrs {
	counter = '[data-test="counter"]',
	increment = '[data-test="increment"]',
	decrement = '[data-test="decrement"]'
}
describe("test component", () => {
	let component: VueWrapper
	beforeEach(() => {
		component = mount(Test)
	})
	it("It mounts succesfullyy ", () => {
		const counter = component.find(dataAttrs.counter)
		expect(counter.text()).toContain("counter 0")
		expect(component.element).toMatchSnapshot()
	})
	it("it increments correctly", async () => {
		await component.find(dataAttrs.increment).trigger("click")
		const counter = component.find(dataAttrs.counter)
		expect(counter.text()).toContain("counter 1")
	})
	it("it decrements correctly", async () => {
		await component.find(dataAttrs.decrement).trigger("click")
		const counter = component.find(dataAttrs.counter)
		expect(counter.text()).toContain("-1")
	})
})
