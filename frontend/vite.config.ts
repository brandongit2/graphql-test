import tailwindcss from "@tailwindcss/vite";
import vitePluginReactSwc from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";

export {config as default};

const config = defineConfig({
	root: "src",
	plugins: [vitePluginReactSwc({
		plugins: [[
			"@swc/plugin-relay",
			{
				rootDir: import.meta.dirname,
				artifactDirectory: "./src/__generated__",
				language: "typescript",
				eagerEsModules: true,
			},
		]],
	}), tailwindcss()],
	build: {
		target: "esnext",
	},
});
