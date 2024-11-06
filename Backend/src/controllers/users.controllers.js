//Aca va la logica de los controladores para las peticiones http para los usuarios
//Nos estaremos centrando en las peticiones post y get
// 1 importar el modelo de datos
import { userModel } from "../models/users.model.js";
import bcrypt from "bcryptjs"; // Dependencia para encriptar informacion

// 2. Crearnos nuestras funciones asincronas para cada petición

//POST
export const createUser = async (request, response) => {
    
     //Aplicamos la deestructuracion para acceder a la informacion que venga en en el body de la peticion
     const { fullName, email, password, role} = request.body

     //Encriptamos la contraseña con bcrypt
     //.hash Nos permite encriptar las contraseña
     //Recibe las contraseña a encriptar y un numero que determina el nivel de seguridad de encriptación
     //Normalmente se usa el numero 10
     const codedPassword = await bcrypt.hash(password, 10)
     
    try {
        const newUser = await userModel.create({
            fullName,
            email,
            password: codedPassword,
            role
        })

        return response.status(201).json({
            message: "User created Succesfully",
            data: newUser
        })
    } catch (error) {
        return response.status(400).json({
            message: "Bad Request creating an User",
            error: error || error.message
        })
    }
}

//GET
export const getUsers = async (request, response) => {
    try {
       
       let users = await userModel.find()

        if (users.length === 0) {
            return response.status(200).json({
                message: "There are no users in the database",
            })
        }

        return response.status(201).json({
            message: "Succesfully read users",
            data: users
        })
    } catch (error) {
        return response.status(400).json({
            message: "Bad Request reading users",
            error: error || error.message
        })
    }
}