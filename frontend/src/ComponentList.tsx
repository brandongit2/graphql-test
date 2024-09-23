import {graphql} from "gql.tada";
import {useForm, type SubmitHandler} from "react-hook-form";
import {useMutation, useQuery} from "urql";

type Inputs = {
	name: string,
};

const GetComponentsQuery = graphql(`
	query GetComponentsQuery {
		getComponents {
			id
			name
		}
	}
`);

const CreateComponentMutation = graphql(`
	mutation CreateComponentMutation($name: String!) {
		createComponent(name: $name) {
			id
		}
	}
`);

export function ComponentList() {
	const [{data}] = useQuery({query: GetComponentsQuery});
	const components = data?.getComponents;

	const [createComponentResult, createComponent] = useMutation(CreateComponentMutation);

	const {handleSubmit, register} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		await createComponent({name: data.name});
	};

	if (!components) return null;

	return (
		<div>
			<div>{components.map((component) => <p key={component.id}>{component.name}</p>)}</div>
			<form className="border border-gray-300 flex flex-col max-w-sm p-4" onSubmit={handleSubmit(onSubmit)}>
				<input type="text" {...register("name")} />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
