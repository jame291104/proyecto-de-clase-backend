// Importar dependencias y modulos

import { verifyToken } from "../lib/jwt.js";

//2 Crear el MIDDLEWARE que nos permita usar la funcion de verificar token
    //2.1 Verificar que exista un token
    //2.2 Verificar que el token sea permitido
    //2.3 Validar el rol -> Verificar permisos

function auth(role) {
    return async (request, response, next) => {

        //Verificacion 1: Existencia del token
        // Accedemos al token generado en caso de que lo haya
        let token = request.headers["authorization"];
        console.log("token in headers " + token);
        
        if (!token) {
            return response.status(401).json({
                message: "Token not provided - denied access"
            });

        } 

        // Verificación del token
        // Eliminamos la palabra Bearer del token para validar el token
        token = token.split(" ")[1];

        //Manejo de errores
        try {
            
            const decoded = await verifyToken(token);
            console.log("decoded", decoded);
            

            //Validacion 3: Verificar rol
            if (role === "admin" && !decoded.isAdmin) {
                return response.status(403).json({
                    message: "Error - Is not an Admin User",
                })
            }

            //Guardamos la info decodificada en la peticion
            request.user = decoded

        } catch (error) {
            return response.status(400).json({
                message: "Error - authentication failed",
                error: error.message || error
            })
        }


        // Indicamos que siga con el siguiente proceso
        next()
    }
}

//3 Exportar
export default auth;