const { productsInstance } = require('./../db')()

class ProductService {
    constructor() {
        this.productsInstance = productsInstance
    }

  getAll() {
    return this.productsInstance.findAll()
  }
}

module.exports = ProductService;
