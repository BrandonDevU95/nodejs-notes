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

Aquí encontrarás una función que he escrito para obtener un puerto disponible en el que se puede levantar un servidor. Esta función es especialmente útil cuando quieres evitar conflictos de puertos en tus aplicaciones.

##Creación de un servidor con Node.js y el módulo HTTP
En esta sección, he detallado cómo crear un servidor básico utilizando Node.js y el módulo HTTP. Este es uno de los primeros pasos para construir aplicaciones web con Node.js.

##Sistema de rutas en un servidor Node.js
Aquí explico cómo implementar un sistema de rutas simple en un servidor Node.js. Esto es fundamental para manejar diferentes rutas y métodos HTTP en tu aplicación.

##Creación de un servidor con Express
Express es un framework minimalista para Node.js que facilita la creación de aplicaciones web y APIs. En esta sección, muestro cómo crear un servidor básico utilizando Express.

##Creación de una API REST con Express
Por último, he incluido un ejemplo de cómo crear una API RESTful utilizando Express. Este es un paso crucial para desarrollar servicios backend modernos.
