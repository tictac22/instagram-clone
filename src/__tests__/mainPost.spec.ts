import mainPostVue from "@/shared/mainPost.vue"
import { flushPromises, mount } from "@vue/test-utils"
import { createHead } from "@vueuse/head"
import { describe, expect, it, vi } from "vitest"
import { renderWithPinia } from "./helpers/renderWithPinia"

vi.mock("@/utils/firebase")

describe("main post", () => {
	it("mounts", async () => {
		const wrapper = mount(mainPostVue, {
			props: {
				user: {
					uid: "3",
					fullName: "3",
					photoUrl: "3",
					userName: "3",
					postsNumber: 3,
					followers: 3
				},
				post: {
					text: "12",
					id: "12",
					uid: "12",
					images: ["12"],
					author: {},
					authorUserName: "12",
					createdAt: {
						seconds: 5
					},
					likes: 5,
					comments: 5
				}
			},
			global: {
				plugins: [
					createHead(),
					renderWithPinia({ stateName: "counter", state: {} })
				],
				directives: {
					clickOutside: () => {}
				},
				stubs: ["FontAwesomeIcon", "RouterLink", "CommentWrapper"]
			}
		})

		expect(wrapper.exists()).toBeTruthy()

		await wrapper.find("textarea").setValue("new comment")
		await wrapper.find("form").trigger("submit.prevent")
		await flushPromises()

		expect(wrapper.emitted()).toHaveProperty("createPost")
		expect(wrapper.text()).toContain("new comment")
	})
})
