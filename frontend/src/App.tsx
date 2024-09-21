import {Suspense} from "react";
import {cacheExchange, Client, fetchExchange, Provider as UrqlProvider} from "urql";

import {HelloGraphql} from "./HelloGraphql.js";

import "./app.css";

const client = new Client({
	url: "http://localhost:8000/graphql",
	exchanges: [cacheExchange, fetchExchange],
});

export function App() {
	return (
		<UrqlProvider value={client}>
			<Suspense>
				<HelloGraphql />
			</Suspense>
		</UrqlProvider>
	);
}
