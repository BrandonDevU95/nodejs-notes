const http = require('node:http');
const product = require('./product.json');

const port = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
	const { method, url } = req;

	switch (method) {
		case 'GET':
			switch (url) {
				case '/products/1':
					res.setHeader(
						'Content-Type',
						'application/json; charset=utf-8'
					);
					return res.end(JSON.stringify(product));
				default:
					res.statusCode = 404;
					res.setHeader('Content-Type', 'text/html; charset=utf-8');
					return res.end('<h1>404</h1>');
			}

		case 'POST':
			switch (url) {
				case '/products':
					let body = '';

					//Escucha el evento de data y recibe por 'pedazos' la informacion
					//Esta la va acumulando en la variable body
					req.on('data', (chunk) => {
						body += chunk.toString();
					});

					//Escucha cuando la peticion finaliza
					req.on('end', () => {
						const data = JSON.parse(body);
						//Aqui se llamaria a una DB para guardar los datos
						res.writeHead(201, {
							'Content-Type': 'application/json; charset=utf-8',
						});

						//Se regresa como respuesta el mismo objeto que el cliente creo con la fecha en la que se creo
						data.timestamp = Date.now();
						res.end(JSON.stringify(data));
					});
			}
			break;

		default:
			res.statusCode = 404;
			res.setHeaders('Content-Type', 'text/plain; charset=utf-8');
			return res.end('404 Not Found');
	}
};

const server = http.createServer(processRequest);

server.listen(port, () => {
	console.log(`Serverr listenign on port http://localhost:${port}`);
});
