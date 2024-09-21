import {graphql} from "gql.tada";
import {useQuery} from "urql";

const query = graphql(`
	query HelloGraphqlQuery {
		hello(name: "GraphQL")
	}
`);

export function HelloGraphql() {
	const [{data}] = useQuery({query});

	return (
		<div>
			<p>{data?.hello}</p>
		</div>
	);
}
