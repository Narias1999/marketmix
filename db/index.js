const singleton = require('./singleton')
const { db: config } = require('./../config')

const productsModel = require('./models/products.model')

module.exports = function() {
  const sequelize = singleton(config)
  const productsInstance = productsModel(config)

  return {
    sequelize,
    productsInstance
  }
}
