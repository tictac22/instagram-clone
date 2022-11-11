import { createTestingPinia } from "@pinia/testing"
import { vi } from "vitest"
type Props = {
	stateName: string
	state: {
		[key: string]: any
	}
}
export const renderWithPinia = ({ stateName, state }: Props) => {
	return createTestingPinia({
		createSpy: vi.fn(),
		initialState: {
			[stateName]: state
		}
	})
}
