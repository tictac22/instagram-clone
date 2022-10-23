import vue from "@vitejs/plugin-vue"
import path from "path"
import { terser } from "rollup-plugin-terser"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [
		vue(),
		terser({
			format: {
				comments: false
			}
		})
	],
	server: {
		port: 3000
	},
	resolve: {
		alias: {
			"@/components": path.resolve(__dirname, "./src/components"),
			"@/pages": path.resolve(__dirname, "./src/pages"),
			"@/utils": path.resolve(__dirname, "./src/utils"),
			"@/assets": path.resolve(__dirname, "./src/assets"),
			"@/shared": path.resolve(__dirname, "./src/shared"),
			"@/layouts": path.resolve(__dirname, "./src/layouts")
		}
	}
})
