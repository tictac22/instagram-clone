/** @type {import('tailwindcss').Config} */
//eslint-disable-next-line
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				heart: {
					"0%": {
						transform: "scale(0)"
					},
					"15%": {
						opacity: "0.9",
						transform: "scale(1.2)"
					},
					"30%": {
						transform: "scale(.95)"
					},
					"45%": {
						opacity: ".9",
						transform: "scale(1)"
					},
					"80%": {
						opacity: ".9",
						transform: "scale(1)"
					},
					"100%": {
						opacity: "0",
						transform: "scale(0)"
					}
				},
				likeButton: {
					"0%": {
						transform: "scale(1)"
					},

					"25%": {
						transform: "scale(1.2)"
					},
					"50%": {
						transform: "scale(.95)"
					},
					"100% ": {
						transform: "scale(1)"
					}
				}
			}
		},
		backgroundPosition: {
			position: "-46px 0px"
		}
	},
	plugins: []
}
