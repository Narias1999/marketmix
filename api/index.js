const express = require('express');
const productsRouter = require('./routes/products');
const shoppingCartRouter = require('./routes/shoppingCarts');

const apiRouter = express.Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/shopping-cart', shoppingCartRouter);

module.exports = apiRouter;
