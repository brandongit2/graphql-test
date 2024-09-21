import tailwindcss from "@tailwindcss/vite";
import vitePluginReactSwc from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";

export {config as default};

const config = defineConfig({
	root: "src",
	plugins: [vitePluginReactSwc(), tailwindcss()],
	build: {
		target: "esnext",
	},
});
