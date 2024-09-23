import {cacheExchange} from "@urql/exchange-graphcache";
import {Suspense} from "react";
import {Client, fetchExchange, Provider as UrqlProvider} from "urql";

import {ComponentList} from "./ComponentList.js";

import "./app.css";

const client = new Client({
	url: "http://localhost:8000/graphql",
	exchanges: [cacheExchange({}), fetchExchange],
});

export function App() {
	return (
		<UrqlProvider value={client}>
			<Suspense>
				<ComponentList />
			</Suspense>
		</UrqlProvider>
	);
}
