import mongoose from "mongoose";

// Creamos la plantilla de los datos / Se desfine SCHEMA

const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'client'},
    
})

// Creamos la coleccion en la base de datos
// Parametro 1: Nombre de la colección
// Parametro 2: Estructura o Schema de datos
export const userModel = mongoose.model('user', userSchema)