// 1 Importar controladores y dependencias necesarias
import { getProduct, createProduct, putProductById, deleteProductById } from "../controllers/product.controller.js";
import express from "express"; //tambien nos ayuda a hacer las rutas para las peticiones -> Router
import auth from "../middleware/auth.js";

// 2 Configurar el router de Express
export const productRouter = express.Router();

// 3 Crear Rutas para las peticiciones

//Primero determino la ruta, luego le indico lo que debe hacer
productRouter.get("/obtener", getProduct);

productRouter.post("/crear", auth("admin"), createProduct);

productRouter.put("/actualizar/:id", auth("admin"), putProductById);

productRouter.delete("/eliminar/:id", auth("admin"), deleteProductById);