import { createTestingPinia } from "@pinia/testing"
import { beforeEach, describe, expect, it, vi } from "vitest"

import Header from "@/components/header/header.vue"
import { useUserStore } from "@/utils/pinia"
import { mount, VueWrapper } from "@vue/test-utils"

const mockRoute = {
	path: ""
}

describe("Header component", () => {
	let wrapper: VueWrapper
	beforeEach(() => {
		wrapper = mount(Header, {
			shallow: true,
			global: {
				stubs: ["FontAwesomeIcon"],
				mocks: {
					route: mockRoute
				},
				plugins: [
					createTestingPinia({
						createSpy: vi.fn(),
						initialState: {
							counter: {
								user: {
									isAuthenticated: false
								}
							}
						}
					})
				]
			}
		})
	})
	it("mounts ssuccesffulyy with correct pinia data", () => {
		const store = useUserStore()
		expect(wrapper.text()).toContain("Sign up")
		expect(store.user.isAuthenticated).toEqual(false)
		expect(wrapper.element).toMatchSnapshot()
	})
})
