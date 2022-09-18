import vue from "@vitejs/plugin-vue"
import path from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
console.log(__dirname)
export default defineConfig({
	plugins: [vue()],
	server: {
		port: 3000
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/components")
		}
	}
})
