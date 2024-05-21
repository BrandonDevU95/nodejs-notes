const express = require('express');
const producto = require('./product.json');
const path = require('path');

const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable('x-powered-by');

// app.use(express.json());

//Asi es como trabaja el middleware de express por debajo
app.use((req, res, next) => {
	if (req.method !== 'POST') return next();
	if (req.headers['content-type'] !== 'application/json') return next();

	// solo llegan request que son POST y que tienen el header Content-Type: application/json
	let body = '';

	// escuchar el evento data y concatena cada chunk que llega en el body
	req.on('data', (chunk) => {
		body += chunk.toString();
	});

	//Una vez que termina de recibir la request, se dispara el evento end
	req.on('end', () => {
		// Aqui parseamos el body a JSON para poder trabajar con el objeto
		const data = JSON.parse(body);
		data.timestamp = Date.now();
		// mutar la request y meter la información en el req.body
		req.body = data;
		next();
	});
});

app.get('/producto/1', (req, res) => {
	res.json(producto);
});

app.post('/pokemon', (req, res) => {
	// req.body deberíamos guardar en bbdd
	res.status(201).json(req.body);
});

// la última a la que va a llegar
app.use((req, res) => {
	res.status(404).send('<h1>404</h1>');
});

app.listen(PORT, () => {
	console.log(`server listening on port http://localhost:${PORT}`);
});
