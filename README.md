# Notas Personales sobre Node.js

¡Bienvenido a mi repositorio de notas personales sobre Node.js! Aquí he recopilado mis apuntes y ejemplos prácticos sobre varios temas fundamentales de Node.js. Este repositorio es una mezcla de teoría y práctica, diseñado para ayudarme a recordar y repasar los conceptos clave y técnicas que he aprendido. Espero que también pueda ser útil para otros que estén aprendiendo Node.js.

## Temario

1. [Principios de Node.js](#principios-de-nodejs)
2. [Función para obtener un puerto disponible](#función-para-obtener-un-puerto-disponible)
3. [Crear un servidor con Node.js y el módulo `http`](#crear-un-servidor-con-nodejs-y-el-módulo-http)
4. [Sistema de rutas en un servidor Node.js](#sistema-de-rutas-en-un-servidor-nodejs)
5. [Servidor con Express](#servidor-con-express)
6. [Creación de una API REST con Express](#creación-de-una-api-rest-con-express)

## Principios de Node.js

Node.js es un entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome. Permite ejecutar código JavaScript del lado del servidor, lo que nos proporciona una gran flexibilidad para crear aplicaciones web completas en un solo lenguaje.

- **Asincronía**: Node.js utiliza un modelo de E/S no bloqueante y basado en eventos, lo que permite manejar muchas conexiones concurrentes sin necesidad de hilos adicionales.
- **Single-threaded**: Aunque Node.js es de un solo hilo, puede manejar múltiples conexiones simultáneamente gracias a su modelo asincrónico y su ciclo de eventos.

## Función para obtener un puerto disponible

A veces necesitamos encontrar un puerto disponible en nuestra máquina para levantar un servidor. Aquí está una función que he creado para hacer justamente eso:
