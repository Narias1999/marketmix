const Sequelize = require('sequelize');
const singleton = require('./../singleton');

module.exports = function (config) {
  const sequelizeInstance = singleton(config);

  return sequelizeInstance.define('products', {
    name: {
      type: Sequelize.TEXT,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    description: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.STRING,
    },
  });
};
