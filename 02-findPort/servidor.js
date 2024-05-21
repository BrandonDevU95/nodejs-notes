const net = require('node:net');

//La funcion recibe el parametro del puesto deseado
function findPortAvailable(desiredPort) {
	return new Promise((resove, reject) => {
		//Crea el servidor
		const server = net.createServer();

		//Si el servidor puede escuchar por el puerto deseado
		server.listen(desiredPort, () => {
			//solicita el puerto del servidor
			const { port } = server.address();
			//Cierra la conexion y devuelve el puerto disponible como resuelto
			server.close(() => {
				resove(port);
			});
		});

		//Si recibe un erro al conectarse al puerto deseado porque ya esta en uso o por alguna otra razon
		server.on('error', (err) => {
			//Compara que el erro recibido es porque el puesto esta en uso. 'Error Address in Use'
			if ((err.code = 'EADDRINUSE')) {
				//Volvemos a llamar a la fucion pasando como parametro el puesto 0
				//Esto busca un puerto disponible y lo pasa como parametro
				//Cuado se resuelve la funcion con un puesto disponible lo devuelbe y resuelve esta segunda llamada con el puerto
				findPortAvailable(0).then((port) => resove(port));
			} else {
				reject(err);
			}
		});
	});
}

module.exports = {
	findPortAvailable,
};
