const express = require('express'); // require -> commonJS
const crypto = require('node:crypto');
const cors = require('cors');

const movies = require('./movies.json');
const { validateMovie, validatePartialMovie } = require('./schemas/movies');

const app = express();
app.disable('x-powered-by'); // deshabilitar el header X-Powered-By: Express
//Esto un middleware que se utiliza para analizar (parsear) cuerpos de solicitudes HTTP con formato JSON.
//La explicacion de como trabaja esta en el archivo 05-express/server.js
app.use(express.json());

//## CORS ##
//CORS es un mecanismo de seguridad que se utiliza en navegadores web para restringir cómo un documento o script de una página web puede interactuar con un recurso de un origen diferente.

//Ejemplo 1 - Todos los origenes
app.get('/ejemplo', (req, res) => {
	//Podemos personalizar que en cada enpoint tenga el acceso de CORS
	res.header('Access-Control-Allow-Origin', '*'); //Cualquier origen puede acceder a mi API
	res.json(movies);
});

//Ejemplo 2 - Solo un origen
app.get('/ejemplo2', (req, res) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); //Solo el origen http://localhost:8080 puede acceder a mi API
	res.json(movies);
});

//Ejemplo 3 - Varios origenes en un array
//La peticion del origin no se envia cuando se hace desde el mismo ORIGIN
//http://localhost:1234 -> http://localhost:1234
app.get('/ejemplo3', (req, res) => {
	const ACCEPTED_ORIGINS = [
		'http://localhost:8080',
		'http://localhost:1234',
		'https://movies.com',
	];
	//Esto obtiene el origen de la peticion
	const origin = req.get('origin');
	if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
		res.header('Access-Control-Allow-Origin', origin);
	}
	res.json(movies);
});

//Ejemplo 4 - Usando CORS de la libreria cors
//El metodo use de express es para utilizar middlewares
app.use(
	cors({
		//Aqui el objeto de configuracion de cors
		origin: (origin, callback) => {
			const ACCEPTED_ORIGINS = [
				'http://127.0.0.1:5500',
				'http://localhost:8080',
				'http://localhost:1234',
				'https://movies.com',
			];

			if (ACCEPTED_ORIGINS.includes(origin)) {
				// Si el origen de la petición está en la lista de aceptados
				//El primer parametro es el error, si es null es que no hay error y el segundo parametro es si se acepta o no la peticion
				return callback(null, true);
			}

			if (!origin) {
				// Para peticiones que no tienen origin (como curl o postman)
				return callback(null, true);
			}

			return callback(new Error('Not allowed by CORS'));
		},
	})
);

//Los recursos que sean MOVIES se identifica con /movies
app.get('/movies', (req, res) => {
	const { genre } = req.query;
	if (genre) {
		const filteredMovies = movies.filter((movie) =>
			movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
		);
		return res.json(filteredMovies);
	}
	res.json(movies);
});

app.get('/movies/:id', (req, res) => {
	const { id } = req.params;
	const movie = movies.find((movie) => movie.id === id);
	if (movie) return res.json(movie);
	res.status(404).json({ message: 'Movie not found' });
});

app.post('/movies', (req, res) => {
	const result = validateMovie(req.body);

	if (!result.success) {
		// 422 Unprocessable Entity
		return res
			.status(400)
			.json({ error: JSON.parse(result.error.message) });
	}

	// en base de datos
	const newMovie = {
		id: crypto.randomUUID(), // uuid v4
		...result.data,
	};

	// Esto no sería REST, porque estamos guardando
	// el estado de la aplicación en memoria
	movies.push(newMovie);

	res.status(201).json(newMovie);
});

//Podemos decir que hay dos tipos de metodos en una API REST
// métodos normales: GET/HEAD/POST
// métodos complejos: PUT/PATCH/DELETE
//CORS Preflight Request: Es una peticion que se hace antes de la peticion principal, para saber si el servidor acepta la peticion principal

//Requiere una peticion OPTIONS para saber si el servidor acepta la peticion
app.delete('/movies/:id', (req, res) => {
	const { id } = req.params;
	const movieIndex = movies.findIndex((movie) => movie.id === id);

	if (movieIndex === -1) {
		return res.status(404).json({ message: 'Movie not found' });
	}

	movies.splice(movieIndex, 1);

	return res.json({ message: 'Movie deleted' });
});

app.patch('/movies/:id', (req, res) => {
	const result = validatePartialMovie(req.body);

	if (!result.success) {
		return res
			.status(400)
			.json({ error: JSON.parse(result.error.message) });
	}

	const { id } = req.params;
	const movieIndex = movies.findIndex((movie) => movie.id === id);

	if (movieIndex === -1) {
		return res.status(404).json({ message: 'Movie not found' });
	}

	const updateMovie = {
		...movies[movieIndex],
		...result.data,
	};

	movies[movieIndex] = updateMovie;

	return res.json(updateMovie);
});

//Aqui se esta utilizando el metodo OPTIONS para saber si el servidor acepta la peticion antes de hacer la peticion principal
app.options('/ejemplo3', (req, res) => {
	const ACCEPTED_ORIGINS = [
		'http://localhost:8080',
		'http://localhost:1234',
		'https://movies.com',
	];
	//Esto obtiene el origen de la peticion
	const origin = req.get('origin');
	if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
		res.header('Access-Control-Allow-Origin', origin);
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
	}
	res.send();
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
	console.log(`server listening on port http://localhost:${PORT}`);
});
