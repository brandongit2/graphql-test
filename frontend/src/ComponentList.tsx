import {IconTrash} from "@tabler/icons-react";
import {Fragment} from "react";
import {useForm} from "react-hook-form";
import {useLazyLoadQuery, useMutation} from "react-relay";
import {graphql} from "relay-runtime";

import {type ComponentListCreateComponentMutation} from "./__generated__/ComponentListCreateComponentMutation.graphql.js";
import {type ComponentListGetComponentsQuery} from "./__generated__/ComponentListGetComponentsQuery.graphql.js";
import {type ComponentListRemoveComponentMutation} from "./__generated__/ComponentListRemoveComponentMutation.graphql.js";

type Inputs = {
	name: string,
};

const GetComponentsQuery = graphql`
	query ComponentListGetComponentsQuery {
		getComponents {
			id
			name
		}
	}
`;

const CreateComponentMutation = graphql`
	mutation ComponentListCreateComponentMutation($name: String!) {
		createComponent(name: $name) {
			id
		}
	}
`;

const RemoveComponentMutation = graphql`
	mutation ComponentListRemoveComponentMutation($id: ID!) {
		removeComponent(id: $id)
	}
`;

export function ComponentList() {
	const data = useLazyLoadQuery<ComponentListGetComponentsQuery>(GetComponentsQuery, {});
	const components = data.getComponents;

	const [createComponent] = useMutation<ComponentListCreateComponentMutation>(CreateComponentMutation);
	const [removeComponent] = useMutation<ComponentListRemoveComponentMutation>(RemoveComponentMutation);

	const {handleSubmit, register, reset} = useForm<Inputs>();

	if (!components) return null;

	return (
		<div>
			<div className="grid grid-cols-[1fr_auto] max-w-sm gap-1 p-1">
				{components.map((component) => (
					<Fragment key={component.id}>
						<p>{component.name}</p>
						<button
							className="cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors rounded aspect-square grid place-content-center"
							onClick={() => removeComponent({variables: {id: component.id}})}
						>
							<IconTrash size="1em" stroke={1.5} />
						</button>
					</Fragment>
				))}
			</div>
			<form
				className="border border-gray-300 flex flex-col max-w-sm p-4 rounded gap-2"
				onSubmit={(event) => {
					handleSubmit((data) => {
						createComponent({variables: {name: data.name}});
						reset();
					})(event).catch((error: unknown) => console.error(error));
				}}
			>
				<input autoComplete="off" className="rounded px-2" type="text" {...register("name")} />
				<button
					className="bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 self-start px-2 transition-colors"
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
	);
}
