// Aca vamos a configurar los metoidos necesarios para generar y verificar nuestro token de autenticación

// 1 Instalar la librería JWT
// 2 Crearnos una clave secreta
// Importamos módulos y dependencias

import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config(); // Configuramos las variables de entorno

const key = process.env.SECRET_KEY

console.log("KEY", key);
