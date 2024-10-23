// Vamos a configurar nuestro servidor con Express y vamos a gestionar todo lo relacionado  con la logica de negocio -> conexion de base de datos, peticiones, respuestas

// 1. Importamos las dependencias y modulos que necesitamos

import express from "express"

// 2 configurar el uso de nuestro servidor
const app = express();
const port = 3000;

// 3. Ejecutar el servidor en nuestro computador
app.listen(port, () => {console.log("We are conected", port)})