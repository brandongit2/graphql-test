import {Suspense} from "react";
import {RelayEnvironmentProvider} from "react-relay";

import {ComponentList} from "./ComponentList.js";
import {createRelayEnvironment} from "./relay-environment.js";

import "./app.css";

const relayEnvironment = createRelayEnvironment();

export function App() {
	return (
		<RelayEnvironmentProvider environment={relayEnvironment}>
			<Suspense>
				<div className="grow grid place-content-center"><ComponentList /></div>
			</Suspense>
		</RelayEnvironmentProvider>
	);
}
