import {
	Environment,
	Network,
	Observable,
	RecordSource,
	Store,
	type FetchFunction,
} from "relay-runtime";

const fetchFunction: FetchFunction = (params, variables) => {
	const response = fetch("http://localhost:8000/graphql", {
		method: "POST",
		headers: [["Content-Type", "application/json"]],
		body: JSON.stringify({
			query: params.text,
			variables,
		}),
	});

	return Observable.from(response.then((data) => data.json()));
};

export const createRelayEnvironment = () => {
	const network = Network.create(fetchFunction);
	const store = new Store(new RecordSource());
	return new Environment({store, network});
};
