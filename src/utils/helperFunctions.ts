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

export const timeAgo = (input: number) => {
	const date = new Date(input * 1000)
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
