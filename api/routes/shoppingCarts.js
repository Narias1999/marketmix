const express = require('express');
const createError = require('http-errors');
const ShoppingCart = require('./../../services/shoppingCarts');

const shoppingCart = new ShoppingCart();
const shoppingCartRouter = express.Router();

shoppingCartRouter.get('/:idCart', async (req, res, next) => {
  const { idCart } = req.params;
  try {
    const response = await shoppingCart.getShoppingCart(idCart)

    res.status(200).json({
      data: response,
      message: 'Carrito de compras obtenido con éxito'
    })
  } catch (error) {
    next(error)
  }
});

shoppingCartRouter.post('/', async (req, res, next) => {
  const { products } = req.body;

  if (!products) {
    return next(createError(400, 'Bad Request: Es obligatorio enviar los productos.'));
  }

  if (!(products instanceof Array)) {
    return next(createError(400, 'Bad Request: Los productos deben ser un array.'));
  }

  if (!products.length) {
    return next(createError(400, 'Bad Request: Debe enviar por lo menos un producto.'));
  }

  if (new Set(products).size !== products.length) {
    return next(createError(400, 'Bad Request: Hay productos repetidos.'));
  }

  try {
    const cart = await shoppingCart.create(products);

    return res
      .status(201)
      .json({
        data: cart,
        message: 'Carrito de compras creado con éxito!',
      });
  } catch (error) {
    next(error);
  }
});

shoppingCartRouter.delete('/:idCart/:idProduct', async (req, res, next) => {
  const { idCart, idProduct } = req.params;

  try {
    const deleteCount = await shoppingCart.deleteCartItem({ idCart, idProduct });

    if (deleteCount) {
      return res.status(204).send();
    }

    return next(createError(400, 'Bad Request: No existe el producto en el carrito de compras.'));
  } catch (error) {
    next(error);
  }
});

module.exports = shoppingCartRouter;
