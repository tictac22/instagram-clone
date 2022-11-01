// @ts-nocheck
export function debounce(fn: (value: string) => void, delay: number) {
	let timeoutID = null
	return function () {
		clearTimeout(timeoutID)
		const args = arguments
		const that = this
		timeoutID = setTimeout(function () {
			fn.apply(that, args)
		}, delay)
	}
}

export const timeAgo = (input: number | string) => {
	const date = new Date(typeof input === "number" ? input * 1000 : input)
	const formatter = new Intl.RelativeTimeFormat("en")
	const ranges = {
		years: 3600 * 24 * 365,
		months: 3600 * 24 * 30,
		weeks: 3600 * 24 * 7,
		days: 3600 * 24,
		hours: 3600,
		minutes: 60,
		seconds: 1
	}
	const secondsElapsed = (date.getTime() - Date.now()) / 1000
	for (const key in ranges) {
		if (ranges[key] < Math.abs(secondsElapsed)) {
			const delta = secondsElapsed / ranges[key]
			return formatter.format(Math.round(delta), key)
		}
	}
}

export const nFormatter = (num: number, digits = 0) => {
	const lookup = [
		{ value: 1, symbol: "" },
		{ value: 1e3, symbol: "k" },
		{ value: 1e6, symbol: "M" },
		{ value: 1e9, symbol: "G" },
		{ value: 1e12, symbol: "T" },
		{ value: 1e15, symbol: "P" },
		{ value: 1e18, symbol: "E" }
	]
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
	const item = lookup
		.slice()
		.reverse()
		.find(function (item) {
			return num >= item.value
		})
	return item
		? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
		: "0"
}

export const getScrollbarWidth = () =>
	window.innerWidth - document.documentElement.clientWidth

const enum status {
	hide = "hide",
	show = "show"
}

export const handlePadingToWindow = (scrollStatus: "hide" | "show") => {
	const body = document.body
	const padding = getScrollbarWidth()

	if (scrollStatus === status.hide) {
		body.classList.add("overflow-y-hidden")
		body.style.paddingRight = `${padding}px`
	} else {
		body.classList.remove("overflow-y-hidden")
		body.style.paddingRight = "0px"
	}
}

export const closeEscModal = (cb: () => void) => {
	if (e.keyCode === 27) {
		cb()
	}
}

export const parsedSuggestedUsersFromLC = () =>
	(JSON.parse(
		window.localStorage.getItem("searchedUsers") as string
	) as Author[]) ?? []

export const hashtag = (text: string) => {
	const repl = text.replace(
		/#\S+|@\S+/gm,
		"<a href=\"#\" class='blue'>$&</a>"
	)
	//repl = text.replace(/#(\w+)/g, `<a href="#" class='blue' >#$1</a>`)
	return repl
}

// /@\S+/gm
