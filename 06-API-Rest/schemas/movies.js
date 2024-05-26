const z = require('zod');

const movieSchema = z.object({
	title: z.string({
		invalid_type_error: 'Movie title must be a string',
		required_error: 'Movie title is required.',
	}),
	year: z.number().int().min(1900).max(2024),
	director: z.string(),
	duration: z.number().int().positive(),
	rate: z.number().min(0).max(10).default(5),
	poster: z.string().url({
		message: 'Poster must be a valid URL',
	}),
	genre: z.array(
		z.enum([
			'Action',
			'Adventure',
			'Crime',
			'Comedy',
			'Drama',
			'Fantasy',
			'Horror',
			'Thriller',
			'Sci-Fi',
		]),
		{
			required_error: 'Movie genre is required.',
			invalid_type_error: 'Movie genre must be an array of enum Genre',
		}
	),
});

//safeParse devuelve un objeto con un error si no se cumple el schema, y
//si se cumple, devuelve un booleano.
function validateMovie(input) {
	return movieSchema.safeParse(input);
}

//el partial es para cuando se quiera actualizar solo una parte del objeto,
//hace que todas las propiedades sean opcionales
function validatePartialMovie(input) {
	return movieSchema.partial().safeParse(input);
}

module.exports = {
	validateMovie,
	validatePartialMovie,
};
