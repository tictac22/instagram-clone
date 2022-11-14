import { defineConfig } from "vitest/config"

import vue from "@vitejs/plugin-vue"
import path from "path"

export const alias: Record<string, string> = {
	"@/components": path.resolve(__dirname, "./src/components"),
	"@/pages": path.resolve(__dirname, "./src/pages"),
	"@/utils": path.resolve(__dirname, "./src/utils"),
	"@/assets": path.resolve(__dirname, "./src/assets"),
	"@/shared": path.resolve(__dirname, "./src/shared"),
	"@/layouts": path.resolve(__dirname, "./src/layouts")
}

export default defineConfig({
	//@ts-ignore
	plugins: [vue()],
	test: {
		environment: "jsdom",
		globals: true
	},

	resolve: {
		alias
	}
})
