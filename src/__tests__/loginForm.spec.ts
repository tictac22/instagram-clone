import { beforeEach, describe, expect, it, vi } from "vitest"
import { renderWithPinia } from "./helpers/renderWithPinia"

import LoginForm from "@/components/register/login/form.vue"
import { logIn } from "@/utils/firebase"
import { flushPromises, mount, VueWrapper } from "@vue/test-utils"

vi.mock("@/utils/firebase")
//@ts-ignore
vi.mocked(logIn).mockResolvedValue(true)
describe("Login form", () => {
	let wrapper: VueWrapper
	beforeEach(() => {
		wrapper = mount(LoginForm, {
			global: {
				plugins: [
					renderWithPinia({
						stateName: "counter",
						state: {}
					})
				]
			}
		})
	})

	it("mounts succesffuly", () => {
		expect(wrapper.exists()).toBeTruthy()
		expect(wrapper.element).toMatchSnapshot()
	})

	it("submits data ", async () => {
		await wrapper
			.find('[data-test="email"]')
			.find("input")
			.setValue("test@test.com")
		await wrapper
			.find('[data-test="password"]')
			.find("input")
			.setValue("123456")

		await wrapper.find("form").trigger("submit.prevent")
		await flushPromises()
		expect(wrapper.emitted()).toHaveProperty("submit")
	})
})
