const express = require('express');
const createError = require('http-errors');

const shoppingCartRouter = express.Router();

shoppingCartRouter.post('/', (req, res, next) => {
  const { body } = req;

  if (!body.products) {
    return next(createError(400, 'Bad Request: Es obligatorio enviar los productos.'));
  }

  if (!(body.products instanceof Array)) {
    return next(createError(400, 'Bad Request: Los productos deben ser un array.'));
  }

  if (!body.products.length) {
    return next(createError(400, 'Bad Request: Debe enviar por lo menos un producto.'));
  }

  return res
    .status(201)
    .json({
      data: {
        id: '123',
        products: [],
      },
      message: 'Carrito de compras creado con éxito!',
    });
});

shoppingCartRouter.delete('/:id/:productId', (req, res, next) => {
  const { id, productId } = req.params;

  return res
    .status(200)
    .json({
      data: {
        id: '123',
      },
      message: 'Producto eliminado éxito!',
    });
});

module.exports = shoppingCartRouter;
