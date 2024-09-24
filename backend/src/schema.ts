import {createId} from "@paralleldrive/cuid2";
import SchemaBuilder from "@pothos/core";

import {getDataAsType} from "./persist.js";

type Component = {
	id: string,
	name: string,
};
type Data = {
	components: Map<string, Component>,
};
const data = getDataAsType<Data>();

const builder = new SchemaBuilder({});

const ComponentRef = builder.objectRef<Component>("Component").implement({fields: (t) => ({
	id: t.exposeID("id", {nullable: false}),
	name: t.exposeString("name", {nullable: false}),
})});

builder.queryType({
	fields: (t) => ({
		getComponent: t.field({
			type: ComponentRef,
			args: {
				id: t.arg.id({required: true}),
			},
			resolve: (root, args) => data.components.get(args.id),
		}),
		getComponents: t.field({
			type: [ComponentRef],
			resolve: () => Array.from(data.components.values()),
		}),
	}),
});

builder.mutationType({
	fields: (t) => ({
		createComponent: t.field({
			type: ComponentRef,
			args: {
				name: t.arg.string({required: true}),
			},
			resolve: (parent, {name}) => {
				const id = createId();
				const component: Component = {id, name};
				data.components.set(id, component);
				return component;
			},
		}),
		removeComponent: t.id({
			args: {
				id: t.arg.id({required: true}),
			},
			resolve: (parent, {id}) => {
				data.components.delete(id);
				return id;
			},
		}),
	}),
});

export const schema = builder.toSchema();
