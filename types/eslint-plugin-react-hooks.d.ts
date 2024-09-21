declare module "eslint-plugin-react-hooks" {
	import {type Linter} from "eslint";

	declare const configs: {
		recommended: Linter.BaseConfig,
	};
	declare const rules: Linter.RulesRecord;

	const plugin = {
		configs,
		rules,
	};

	export default plugin;
}
