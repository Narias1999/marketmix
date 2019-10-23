const { products } = require('./../db')();

class ProductService {
  getAll() {
    return products.findAll();
  }
}

module.exports = ProductService;
