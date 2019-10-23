const express = require('express');
const Products = require('./../../services/products')

const prodcutsService = new Products()

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await prodcutsService.getAll()

        res
          .status(200)
          .json({
            data: products,
            message: 'Productos obtenidos exitósamente!',
          });
    } catch (error) {
        next(error)
    }
});

module.exports = productsRouter;
