// Aca vamos a configurar los metoidos necesarios para generar y verificar nuestro token de autenticación

// 1 Instalar la librería JWT
// 2 Crearnos una clave secreta
// 3 Importamos módulos y dependencias

import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config(); // Configuramos las variables de entorno

// 4 Configuramos el uso de la clave secreta creada en el archivo .env
const key = process.env.SECRET_KEY

// 5 Crear las funciones para generar y verificar el token

// Esta funcion genera el token
export function generateToken (payload) {
    
    // nos creamos una funcion que promete devolver una respuesta despues de cierto tiempo
    return new Promise((resolve, reject) => {
        jwt.sign(payload, key, {expiresIn: '1h'}, (error, token) => {

            if (error) {
                reject(new Error("Error generating JWT " + error.message))
            } else {
                resolve(token);
            }
        })
    })
}

// Esta función verifica el token
export function verifyToken (token) {

    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (error, decoded) => {

            if (error) {
                reject(new Error("Error verifying JWT " + error.message))
            } else {
                resolve(decoded);
            }
        })
    })
}

