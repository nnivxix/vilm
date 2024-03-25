import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		AutoImport({
			imports: [
				"react",
				"react-router-dom",
				{
					from: "react",
					imports: ["createContext"],
				},
				{
					"react-router-dom": [["BrowserRouter", "Router"]],
				},
			],
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.md$/, // .md
			],
			dts: "./auto-imports.d.ts",
			eslintrc: {
				enabled: true,
			},
			dirs: [
				"./src/components/**",
				"./src/config",
				"./src/hooks",
				"./src/pages/**",
				"./src/types",
				"./src/utils",
				"./src/providers",
				"./src/lib",
			],
		}),
		react(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
