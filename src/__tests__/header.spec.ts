import { beforeEach, describe, expect, it, vi } from "vitest"

import Header from "@/components/header/header.vue"
import { useUserStore } from "@/utils/pinia"
import { mount, VueWrapper } from "@vue/test-utils"
import { createPinia, setActivePinia } from "pinia"

type store = ReturnType<typeof useUserStore>
const mockRoute = {
	path: ""
}
vi.mock("@/utils/pinia", () => ({
	useUserStore: vi.fn(() => ({
		user: {
			isAuthenticated: false
		}
	}))
}))
describe("Header component", () => {
	let wrapper: VueWrapper
	let store: store
	beforeEach(() => {
		wrapper = mount(Header, {
			shallow: true,
			global: {
				stubs: ["FontAwesomeIcon"],
				mocks: {
					route: mockRoute
				}
			}
		})
		setActivePinia(createPinia())
		store = useUserStore()
	})
	it("mounts ssuccesffulyy with correct pinia data", () => {
		expect(wrapper.text()).toContain("Sign up")
		expect(store.user.isAuthenticated).toEqual(false)
		expect(wrapper.element).toMatchSnapshot()
	})
})
