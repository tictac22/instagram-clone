type IParams = {
	id?: string
	router?: {
		push: any
	}
}
export const globalParams = ({ id = "", router }: IParams) => {
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
			route: mockRoute,
			router
		}
	}
}
