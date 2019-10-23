const singleton = require('./singleton');
const { db: config } = require('./../config');

const productsModel = require('./models/products.model');
const shoppingCartModel = require('./models/shoppingCart.model');
const shoppingCartDetailsModel = require('./models/shoppingCartDetails.model');

module.exports = function () {
  const sequelize = singleton(config);
  const products = productsModel(config);
  const shoppingCarts = shoppingCartModel(config);
  const shoppingCartDetails = shoppingCartDetailsModel(config);

  products.hasMany(shoppingCartDetails, { foreignKey: 'idProduct' });
  shoppingCarts.hasMany(shoppingCartDetails, { foreignKey: 'idCart', as: 'products' });

  shoppingCartDetails.belongsTo(products, { foreignKey: 'idProduct', as: 'product' });
  shoppingCartDetails.belongsTo(shoppingCarts, { foreignKey: 'idCart', as: 'cart' });

  return {
    sequelize,
    products,
    shoppingCarts,
    shoppingCartDetails,
  };
};
