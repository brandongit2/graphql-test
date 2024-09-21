declare module "eslint-plugin-react-refresh" {
	import {type Rule} from "eslint";

	declare const rules: Record<string, Rule.RuleModule>;

	export {rules};
}
