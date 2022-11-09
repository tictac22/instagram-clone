type IParams = {
	id?: string
}
export const globalParams = ({ id = "" }: IParams) => {
	const mockRoute = {
		path: "",
		params: {
			id
		}
	}

	return {
		stubs: ["FontAwesomeIcon", "RouterLink"],
		directives: {
			//eslint-disable-next-line
			clickOutside: () => {}
		},
		mocks: {
			route: mockRoute
		}
	}
}
