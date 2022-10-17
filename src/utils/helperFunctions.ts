// @ts-nocheck
export function debounce(fn: () => void, delay: number) {
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
