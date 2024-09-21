import vitePluginReactSwc from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";

export {config as default};

const config = defineConfig({
	plugins: [vitePluginReactSwc()],
});
