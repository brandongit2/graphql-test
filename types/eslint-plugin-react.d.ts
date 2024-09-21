declare module "eslint-plugin-react" {
	import {type Linter} from "eslint";

	declare const deprecatedRules: Linter.RulesRecord;
	declare const rules: Linter.RulesRecord;
	declare const configs: {
		recommended: Linter.Config,
		all: Linter.Config,
		"jsx-runtime": Linter.Config,
		flat: {
			recommended: Linter.Config,
			all: Linter.Config,
			"jsx-runtime": Linter.Config,
		},
	};

	const plugin = {
		deprecatedRules,
		rules,
		configs,
	};

	export default plugin;
}
