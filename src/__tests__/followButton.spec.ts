import { describe, expect, it, vi } from "vitest"

import Follow from "@/components/follow.vue"
import { mount } from "@vue/test-utils"
import { useRoute } from "vue-router"
import { renderWithPinia } from "./helpers/renderWithPinia"

vi.mock("vue-router", () => ({
	useRoute: vi.fn()
}))
const mocked = vi.mocked(useRoute).mockReturnValue({
	params: {
		id: "1"
	}
})
describe("follow button", () => {
	it("mounts", async () => {
		const wrapper = mount(Follow, {
			global: {
				plugins: [
					renderWithPinia({
						stateName: "counter"
					})
				]
			}
		})
		await wrapper.find("#follow").trigger("click")

		expect(wrapper.emitted()).toHaveProperty("updateCount")
	})
})
