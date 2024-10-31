// Los Controllers gestionan la logica de las peticiones GET, POST, PUT, DELETE
// 1 importar el modelo de datos
import { productModel } from "../models/product.model.js";

// POST
export const createProduct = async (request, response) => {
    try {
        const newProduct = await productModel.create(request.body)
        return response.status(201).json({
            message: "Succesfully created",
            data: newProduct
        })
    } catch (error) {
        return response.status(400).json({
            message: "Bad Request creating a product",
            error: error || error.message
        })
    }
}

// GET
export const getProduct = async (request, response) => {
    try {
        //El metodo Find nos trae todo lo que hay en la base de datos
        let products = await productModel.find()

        if (products.length === 0) {
            return response.status(200).json({
                message: "There are no products in the database",
            })
        }

        return response.status(201).json({
            message: "Succesfully read products",
            data: products
        })
    } catch (error) {
        return response.status(400).json({
            message: "Bad Request reading products",
            error: error || error.message
        })
    }
}

// PUT
export const putProductById = async (request, response) => {

    try {
        let productId = request.params.id
        let productForUpdate = request.body
        const productUpdated = await productModel.findByIdAndUpdate(productId, productForUpdate);

        if (!productUpdated) {
            return response.status(404).json({
                message: "There is no product with that id",
            })
        }
        return response.status(201).json({
            message: "Succesfully updated",
            data: productUpdated
        })
    } catch (error) {
        return response.status(400).json({
            message: "Bad Request updating a product",
            error: error || error.message
        })
    }
}

// DELETE
export const deleteProductById = async (request, response) => {
    try {
        let productId = request.params.id
        await productModel.findByIdAndDelete(productId)
        return response.status(200).json({
            message: "Succesfully deleted",
        })
    } catch (error) {
        return response.status(400).json({
            message: "Bad Request deleting a product",
            error: error || error.message
        })
    }
}