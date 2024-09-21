import {createYoga} from "graphql-yoga";
import {createServer} from "node:http";

import {schema} from "./schema.js";

const port = 8000;

const yoga = createYoga({schema});

const server = createServer(yoga);

server.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}/graphql`);
});
