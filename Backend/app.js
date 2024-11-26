// Vamos a configurar nuestro servidor con Express y vamos a gestionar todo lo relacionado  con la logica de negocio -> conexion de base de datos, peticiones, respuestas

// 1. Importamos las dependencias y modulos que necesitamos

import express from "express"
import dotenv from "dotenv" // dependencia para manejar variables de entorno
import { connectionMongo } from "./src/config/dataBase.js";
import { productRouter } from "./src/routes/product.routes.js"
import { usersRouter } from "./src/routes/users.routes.js";
import { loginRouter } from "./src/routes/login.routes.js";

// 2 configurar el uso de nuestro servidor
const app = express();
dotenv.config();
connectionMongo();

const port = process.env.PORT;

app.use(express.json());

// Le indico las rutas que voy a usar
app.use("/productos", productRouter)
app.use("/users", usersRouter)
app.use("/", loginRouter)

// 3. Ejecutar el servidor en nuestro computador
app.listen(port, () => {console.log("We are conected", port)})