//En este archivo realizamos la logica para el inicio de sesion de los usuarios

// 1. Importar dependencias y modulos
// Necesitamos el modelo para poder verificar el correo y contraseña con la información de la base de datos
import { userModel } from "../models/users.model.js";

// Importar la funcion que nos creamos para generar tokens
import { generateToken } from "../lib/jwt.js";

//importamos el bcrypt para poder comparar la contraseña ingresada con la encriptada
import bcrypt from "bcryptjs";

// 2. Nos creamos una funcion para gestionar el inicio de sesion

export const handleLogin = async (request, response) => {

    //Manejo de los errores

    //Cuando iniciemos sesion satisfactoriamente y se genera el token
    try {

        // VALIDACION 1 --> CORREO
        const {emailLogin, passwordLogin} = request.body

        //Buscar si emailLogin existe en la base de datos
        const userFound = await userModel.findOne({
            email: emailLogin
        })
        console.log("UserFound", userFound);
        

        if (!userFound) { // Si no se encuentran usuarios con el emailLogin
            // 404 Not Found
            return response.status(404).json({message: "Error - user not found"})
        }

        // VALIDACIÓN 2: CONTRASEÑA
        // Comparar passwordLogin con la contraseña almacenada en la base de datos
        // Usamos el bcrypt.compare() para comparar las contraseñas encriptadas
        const isValidPassword = await bcrypt.compare(passwordLogin, userFound.password)

        if (!isValidPassword) {
            return response.status(401).json({message: "Error - Unauthorized password"})
        }

        // Verificar permisos
        const payload = {
            id: userFound._id,
            name: userFound.fullName,

        }

        // Pero si es administrador, enviar ese rol en el payload

        if (userFound.role === "admin") {
            payload.isAdmin = true;
        }
        
        //Generamos el token
        //Pasamos la info del usuario si es el cliente en el payload
        const token = await generateToken(payload);

        return response.status(200).json({
            message: "Succesfully Login",
            token: token
        })



    } catch (error) { // Cuando no se pudo iniciar sesion exitosamente
        return response.status(400).json({
            message: "Error login",
            error: error.message || error
        })
    }
}