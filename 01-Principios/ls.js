//Funcion que reciba por parametro opcional la ruta de los archivos que queremos listar
//Si la funcion no recibe ningun parametro deberia listar el del directorio actual
//El listado deberia mostrar: Si es un directorio o un archivo (d - f), Su tamaño en mb y su fecha de modificacion.
//La funcion deberia ser asincrona

/*Notas:
1- Debria leer primero los archivos del directorio y saber si hay o no archivos o carpetas
2- Por cada archivo o carpeta que lea deberia sacar el status
3- Al tener cada status deberia solo separar los datos que solicita
4- Retornar un strig con los datos solicitados

*/
const fs = require('node:fs/promises');
const path = require('node:path');

const dir = process.argv[2] ?? '.';

async function ls(directory) {
	let files;

	try {
		files = await fs.readdir(directory);
	} catch (error) {
		console.log('Erro to read fieles', error);
		process.exit(1);
	}

	const filePromises = files.map(async (file) => {
		const pathFile = path.join(directory, file);
		let stats;

		try {
			stats = await fs.stat(pathFile);
		} catch (error) {
			console.log('No se pudo leer el archivo:', pathFile);
			process.exit(1);
		}

		const isDir = stats.isDirectory();
		const fileType = isDir ? 'd' : 'f';
		const size = stats.size.toString();
		const modTime = stats.mtime.toLocaleDateString();

		return `${fileType} ${file.padEnd(10)} ${size} ${modTime}`;
	});

	const filesInfo = await Promise.all(filePromises);
	filesInfo.forEach((fileInfo) => console.log(fileInfo));
}

ls(dir);
