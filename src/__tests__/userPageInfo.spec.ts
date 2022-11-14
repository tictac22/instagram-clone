import { useUserStore } from "@/utils/pinia"
import { beforeEach, describe, expect, it, vi } from "vitest"

import UserPageInfoVue from "@/components/user/userPageInfo.vue"
import { getUserPage } from "@/utils/firebase"
import { flushPromises, mount, VueWrapper } from "@vue/test-utils"
import { createHead } from "@vueuse/head"
import { defineComponent } from "vue"
import { useRoute } from "vue-router"
import { renderWithPinia } from "./helpers/renderWithPinia"
vi.mock("@/utils/firebase")

vi.mocked(getUserPage).mockResolvedValue({
	uid: "1",
	fullName: "elon musk",
	userName: "@elon",
	postsNumber: 2000,
	followers: 1,
	photoUrl: ""
})
vi.mock("vue-router", () => ({
	useRoute: vi.fn()
}))
vi.mocked(useRoute).mockReturnValue({
	params: {
		id: "1"
	}
})

describe("user page info", () => {
	let wrapper: VueWrapper
	beforeEach(async () => {
		const AsyncWrapper = defineComponent({
			components: { UserPageInfoVue },
			template: "<Suspense><UserPageInfoVue/></Suspense>"
		})
		wrapper = mount(AsyncWrapper, {
			global: {
				plugins: [
					createHead(),
					renderWithPinia({
						stateName: "counter",
						state: {}
					})
				]
			}
		})

		await flushPromises()
	})
	it("mounts succesfully", async () => {
		expect(wrapper.exists()).toBeTruthy()
		expect(wrapper.text()).toContain("Posts")
	})
	it("subsbcribes", async () => {
		const store = useUserStore()
		await wrapper.find("#follow").trigger("click")
		expect(wrapper.text()).toContain("2 followers")
	})
})
