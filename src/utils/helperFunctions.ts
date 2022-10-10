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
