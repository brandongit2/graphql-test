import {Suspense} from "react";
import {Provider as UrqlProvider} from "urql";

import {ComponentList} from "./ComponentList.js";
import {urqlClient} from "./urql-client.js";

import "./app.css";

export function App() {
	return (
		<UrqlProvider value={urqlClient}>
			<Suspense>
				<div className="grow grid place-content-center"><ComponentList /></div>
			</Suspense>
		</UrqlProvider>
	);
}
