// EN ESTE ARCHIVO ESCRIBIMOS EL CÓDIGO PARA LA CONEXION CON LA BASE DE DATOS

import mongoose from "mongoose";

// 2. Creamos una funcion para conectar la base de datos

export async function connectionMongo() {

    try {
        await mongoose.connect(process.env.DB_URL, {dbName: "actividadClase"});
        console.log("Successful connection to DB");
        
    } catch (error) {
        console.error("Error de conexión: " + error)
    }
    
}