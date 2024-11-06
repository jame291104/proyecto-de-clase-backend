// 1 Importar controladores y dependencias necesarias
import { getUsers, createUser } from "../controllers/users.controllers.js";
import express from "express";

// 2 Configurar el router de Express
export const usersRouter = express.Router();

// 3 Crear Rutas para las peticiciones

//Primero determino la ruta, luego le indico lo que debe hacer
usersRouter.get("/obtener", getUsers)

usersRouter.post("/crear", createUser)