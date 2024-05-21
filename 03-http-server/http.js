const http = require('node:http');

const port = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
	//Configuracion de la cabecera de la respuesta
	res.setHeaders('Content-Type', 'text/html; charset=utf-8');

	//Evalua la ruta a la que el usuario desea acceder
	if (req.url === '/') {
		res.end('<h1>Mi Página<h1>');
	} else if (req.url === '/contact') {
		res.end('<h1>Estas en Contacto<h1>');
	} else if (req.url === '/info') {
		res.end('<h1>Estas en Info<h1>');
	} else {
		res.statusCode = 404; //Not Found
		res.end('<h1>404<h1>');
	}
};

const server = http.createServer(processRequest);

server.listen(port, () => {
	console.log(`Serverr listenign on port http://localhost:${port}`);
});
