import js from "@eslint/js";
import * as stylistic from "@stylistic/eslint-plugin";
import {type Linter} from "eslint";
import eslintPluginImportX from "eslint-plugin-import-x";
import nodePlugin from "eslint-plugin-n";
import perfectionist from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks"; // Supports ESLint 9, but doesn't support flat config so I have to use it a bit funny
import * as reactRefresh from "eslint-plugin-react-refresh";
import esEslint from "typescript-eslint";

export {config as default};

const tsEslintConfigs: Linter.Config[] = [
	// typescript-eslint uses their own config types which are purposefully not assignable to ESLint's config types.
	// We cast to `any` to ignore this.
	// https://typescript-eslint.io/packages/typescript-eslint/#config
	// https://github.com/typescript-eslint/typescript-eslint/issues/9724#issuecomment-2270409598

	// eslint-disable-next-line import-x/no-named-as-default-member, @typescript-eslint/no-explicit-any
	...esEslint.configs.strictTypeChecked as any as Linter.Config[],
	// eslint-disable-next-line import-x/no-named-as-default-member, @typescript-eslint/no-explicit-any
	...esEslint.configs.stylisticTypeChecked as any as Linter.Config[],
];

const config = [
	// ===== ESLint recommended configs =====
	js.configs.recommended,

	// ===== typescript-eslint recommended configs =====
	// Pattern from here: https://eslint.org/docs/latest/use/configure/combine-configs#apply-a-config-array-to-a-subset-of-files
	...tsEslintConfigs.map((config) => ({
		...config,
		files: ["**/*.+(ts|tsx|cts|mts)"],
	})),

	// ===== ESLint Stylistic recommended configs =====
	stylistic.configs.customize({
		flat: true,
		arrowParens: true,
		blockSpacing: false,
		braceStyle: "1tbs",
		indent: "tab",
		quoteProps: "as-needed",
		quotes: "double",
		semi: true,
	}),

	// ===== eslint-plugin-import-x recommended configs =====
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config uses the typescript-eslint types mentioned above.
	eslintPluginImportX.flatConfigs.recommended as any as Linter.Config,
	eslintPluginImportX.flatConfigs.typescript,

	// ===== eslint-plugin-n recommended configs =====
	nodePlugin.configs["flat/recommended-script"],

	// ===== eslint-plugin-react recommended configs =====
	react.configs.flat.recommended,
	react.configs.flat["jsx-runtime"],

	// ===== Our own configs =====
	{
		settings: {
			perfectionist: {
				type: "natural",
				order: "asc",
				ignoreCase: true,
			},
			react: {
				version: "detect",
			},
		},
	},

	{
		files: ["**/*.+(js|jsx|cjs|mjs|ts|tsx|cts|mts)"],
		plugins: {
			"@stylistic": stylistic.default,
			perfectionist,
		},
		languageOptions: {
			sourceType: "module",
		},
		rules: {
			"@stylistic/array-bracket-newline": ["warn", "consistent"],
			"@stylistic/array-element-newline": ["warn", "consistent"],
			"@stylistic/array-bracket-spacing": ["warn", "never"],
			"@stylistic/function-call-spacing": ["warn"],
			"@stylistic/function-paren-newline": ["warn", "consistent"],
			"@stylistic/generator-star-spacing": ["warn", {before: false, after: true}],
			"@stylistic/indent-binary-ops": ["warn", "tab"],
			"@stylistic/jsx-pascal-case": ["warn"],
			"@stylistic/jsx-self-closing-comp": ["warn"],
			"@stylistic/jsx-sort-props": ["warn", {callbacksLast: true, reservedFirst: true}],
			"@stylistic/linebreak-style": ["error"],
			"@stylistic/lines-around-comment": ["warn", {beforeBlockComment: false, afterHashbangComment: true}],
			"@stylistic/member-delimiter-style": [
				"warn",
				{
					multiline: {
						delimiter: "comma",
						requireLast: true,
					},
					singleline: {
						delimiter: "comma",
						requireLast: false,
					},
					overrides: {
						interface: {
							multiline: {
								delimiter: "semi",
								requireLast: true,
							},
							singleline: {
								delimiter: "semi",
								requireLast: false,
							},
						},
					},
				},
			],
			"@stylistic/multiline-comment-style": ["warn", "separate-lines"],
			"@stylistic/no-extra-parens": ["warn", "all", {ignoreJSX: "multi-line"}],
			"@stylistic/no-extra-semi": ["warn"],
			"@stylistic/no-tabs": ["warn", {allowIndentationTabs: true}],
			"@stylistic/object-curly-newline": ["warn"],
			"@stylistic/object-curly-spacing": ["warn", "never"],
			"@stylistic/object-property-newline": ["warn", {allowAllPropertiesOnSameLine: true}],
			"@stylistic/padding-line-between-statements": [
				"warn",
				// Around functions:
				{blankLine: "always", prev: "*", next: "function"},
				{blankLine: "always", prev: "function", next: "*"},
				// Around classes:
				{blankLine: "always", prev: "*", next: "class"},
				{blankLine: "always", prev: "class", next: "*"},
				// Around enums:
				{blankLine: "always", prev: "*", next: "enum"},
				{blankLine: "always", prev: "enum", next: "*"},
				// Around interfaces:
				{blankLine: "always", prev: "*", next: "interface"},
				{blankLine: "always", prev: "interface", next: "*"},
				// After directives:
				{blankLine: "always", prev: "directive", next: "*"},
				// Around export groups:
				{blankLine: "always", prev: "*", next: "export"},
				{blankLine: "any", prev: "export", next: "export"},
				// Before function overload groups:
				{blankLine: "always", prev: "*", next: "function-overload"},
				{blankLine: "any", prev: "function-overload", next: "function-overload"},
			],
			"@stylistic/quote-props": ["warn", "as-needed"],
			"@stylistic/switch-colon-spacing": ["warn"],

			"import-x/consistent-type-specifier-style": ["warn", "prefer-inline"],
			"import-x/no-anonymous-default-export": ["warn"],
			"import-x/no-cycle": ["error"],
			"import-x/no-duplicates": ["error", {"prefer-inline": true}],
			"import-x/no-extraneous-dependencies": ["error", {devDependencies: true}],
			"import-x/order": [
				"warn",
				{
					groups: [
						["builtin", "external"],
						["object", "unknown", "type"],
						["internal", "parent", "index", "sibling"],
					],
					pathGroups: [{pattern: "@/**", group: "internal"}],
					pathGroupsExcludedImportTypes: ["type"],
					"newlines-between": "always",
					alphabetize: {order: "asc", caseInsensitive: true},
				},
			],

			"n/no-missing-import": ["off"],
			"n/prefer-node-protocol": ["warn"],

			"perfectionist/sort-array-includes": ["warn", {groupKind: "spreads-first"}],
			"perfectionist/sort-intersection-types": ["warn"],
			"perfectionist/sort-named-exports": ["warn", {groupKind: "values-first"}],
			"perfectionist/sort-named-imports": ["warn", {groupKind: "values-first"}],
			"perfectionist/sort-objects": ["warn", {destructureOnly: true}],
			"perfectionist/sort-union-types": ["warn"],
		},
	},

	{
		files: ["**/*.+(ts|tsx|cts|mts)"],
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
		rules: {
			"@typescript-eslint/array-type": ["warn", {default: "array-simple"}],
			"@typescript-eslint/consistent-type-definitions": ["warn", "type"],
			"@typescript-eslint/consistent-type-imports": ["warn", {fixStyle: "inline-type-imports"}],
			"@typescript-eslint/no-confusing-void-expression": ["warn", {ignoreVoidOperator: true}],
			"@typescript-eslint/no-meaningless-void-operator": ["off"],
			"@typescript-eslint/no-misused-promises": ["warn", {checksVoidReturn: false}],
			"@typescript-eslint/no-unnecessary-condition": ["warn", {allowConstantLoopConditions: true}],
			"@typescript-eslint/restrict-template-expressions": ["warn", {allowNumber: true}],
		},
	},

	{
		files: ["**/*.+(jsx|tsx)"],
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": "warn",
		},
	},
];
