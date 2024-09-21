declare module "eslint-plugin-json" {
	import {type Linter} from "eslint";

	declare const json: {
		meta: {
			name: "eslint-plugin-json",
			version: "3.1.0",
		},
		rules: Record<string, Rule.RuleModule>,
		configs: {
			"recommended-legacy": Linter.Config,
			"recommended-with-comments-legacy": Linter.Config,
			recommended: Linter.Config,
			"recommended-with-comments": Linter.Config,
		},
		processors: {
			".json": Linter.Processor,
			json: Linter.Processor,
		},
	};
	export = json;
}
