import {type CodegenConfig} from "@graphql-codegen/cli";

export {config as default};

const config: CodegenConfig = {
	schema: "http://localhost:8000/graphql",
	documents: ["src/**/*.ts"],
	ignoreNoDocuments: true,
	generates: {
		"./schema.graphql": {
			plugins: ["schema-ast"],
			config: {
				includeDirectives: true,
			},
		},
	},
};
