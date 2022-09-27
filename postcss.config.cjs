const cssnano = require("cssnano")
module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
		...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {})
	}
}
