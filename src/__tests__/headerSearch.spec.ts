import Search from "@/components/header/search.vue"
import { suggestUser } from "@/utils/firebase"
import { mount, VueWrapper } from "@vue/test-utils"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { nextTick } from "vue"

import { router } from "./helpers/renderWithRouter"

vi.mock("@/utils/firebase")
const fakeUser = [
	{
		uid: "1",
		fullName: "333",
		userName: "333",
		postsNumber: 0,
		followers: 0,
		photoUrl: ""
	}
]
const suggest = vi.mocked(suggestUser).mockResolvedValue(fakeUser)

describe("headSearch component", () => {
	let wrapper: VueWrapper
	beforeEach(async () => {
		wrapper = mount(Search, {
			global: {
				plugins: [router],
				stubs: ["FontAwesomeIcon"],
				directives: {
					clickOutside: () => {}
				}
			},
			props: {
				searchInput: "",
				"onUpdate:searchInput": (e: string) =>
					wrapper.setProps({ searchInput: e })
			}
		})

		await wrapper.find("input").setValue("test")
		await new Promise(r => setTimeout(r, 2000))

		await suggest("elon musk")
		await nextTick()
	}, 4000)
	it("mounts successfuly", () => {
		expect(wrapper.text()).toContain("Recent")
	})
	it("fetchs data and render them", () => {
		expect(wrapper.find('[data-test="1"]')).toBeTruthy()
	})
	it("adds searched user to state", async () => {
		const spy = vi.spyOn(Storage.prototype, "setItem")

		wrapper.find('[data-test="1"]').trigger("click")

		expect(spy).toHaveBeenCalledWith(
			"searchedUsers",
			JSON.stringify(fakeUser)
		)
		expect(wrapper.element).toMatchSnapshot()
	})
	it("deletes history", async () => {
		const spy = vi.spyOn(Storage.prototype, "removeItem")

		await wrapper.find('[data-test="1"]').trigger("click")
		await wrapper.find("#deleteButton").trigger("click")

		expect(spy).toHaveBeenCalledWith("searchedUsers")
	})
})
