import * as http from "node:http";

const host = "localhost";
const port = 8000;

const requestListener: http.RequestListener = (req, res) => {
	res.writeHead(200);
	res.end("Hello, world!");
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
	console.log(`Server is running at http://${host}:${port}`);
});
