import { createPinia } from "pinia"
import { describe, expect, it, vi } from "vitest"

import Follow from "@/components/follow.vue"
import { useUserStore } from "@/utils/pinia"
import { flushPromises, mount } from "@vue/test-utils"
import { renderWithPinia } from "./helpers/renderWithPinia"

const fakeState = {
	user: {
		data: {
			uid: "dasdassa",
			subscribed: [""]
		}
	}
}
const mockRoute = {
	params: {
		id: "1"
	}
}
describe("follow button", () => {
	it("mounts with follow button", async () => {
		const pinia = createPinia()
		const store = useUserStore(pinia)
		store.$patch({ user: fakeState.user })

		vi.spyOn(store, "handleSubscribe")

		fakeState.user.data.subscribed[0] = ""
		const wrapper = mount(Follow, {
			props: {
				id: "1"
			},
			global: {
				mocks: {
					route: mockRoute
				}
			}
		})

		await wrapper.find("#follow").trigger("click")

		expect(wrapper.emitted()).toHaveProperty("updateCount")
		expect(store.handleSubscribe).toBeCalledTimes(1)
		expect(store.handleSubscribe).toBeCalledWith("1")

		await flushPromises()
	})

	it("mounts with unfollow button", async () => {
		fakeState.user.data.subscribed[0] = "1"
		const wrapper = mount(Follow, {
			props: {
				id: "1"
			},
			global: {
				plugins: [
					renderWithPinia({
						stateName: "counter",
						state: fakeState
					})
				],
				mocks: {
					route: mockRoute
				}
			}
		})
		await wrapper.find("#unfollow").trigger("click")

		expect(wrapper.emitted()).toHaveProperty("updateCount")
	})
})
