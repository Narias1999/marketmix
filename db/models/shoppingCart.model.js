const Sequelize = require('sequelize');
const singleton = require('../singleton');

module.exports = function (config) {
  const sequelizeInstance = singleton(config);

  return sequelizeInstance.define('shopping_cart', {
  });
};
