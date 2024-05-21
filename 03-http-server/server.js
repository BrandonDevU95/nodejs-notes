const http = require('node:http');

const port = process.env.PORT ?? 1234;

const processRequest =
	(req,
	(res) => {
		res.end('hola mundo');
	});

const server = http.createServer(processRequest);

server.listen(port, () => {
	console.log(`Serverr listenign on port http://localhost:${port}`);
});
