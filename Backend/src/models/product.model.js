import mongoose from "mongoose";

// Creamos la plantilla de los datos / Se desfine SCHEMA

const productSchema = new mongoose.Schema({
    image: {type: String, required: true},
    name: {type: String, required: true},
    category: {type: String, required: false},
    price: {type: Number, required: true},
    stock: {type: Number, require: true},
    isAvailable: {type: Boolean, required: false}
})

// Creamos la coleccion en la base de datos
// Parametro 1: Nombre de la colección
// Parametro 2: Estructura o Schema de datos
export const productModel = mongoose.model('product', productSchema)