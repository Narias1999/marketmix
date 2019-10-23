const { shoppingCartDetails, shoppingCarts, products: productsDB } = require('./../db')();

class ShoppingCartService {

  getShoppingCart(cartId) {
    return {};
  }

  /**
   * @param {number[]} products array od products ids
   */
  async create(products) {
    // check if product alrady exists in DB
    const exitsPromises = products.map(async idProduct => {
      const count = await productsDB.count({ where: { id: idProduct } })
      if (count) return true
      throw new Error(`Bad Request: No existe ningun producto con id ${idProduct}`)
    })

    await Promise.all(exitsPromises)

    let cart = await shoppingCarts.create({})
    cart = cart.get({ plain: true })

    const details = products.map(idProduct => {
      return {
        idProduct,
        idCart: cart.id
      }
    })

    await shoppingCartDetails.bulkCreate(details)

    return {
      id: cart.id,
      products
    }
  }

  /**
   * @param {object} param 
   * @param {number} param.idCart 
   * @param {number} param.idProduct 
   */
  deleteCartItem({ idCart, idProduct}) {
    return shoppingCartDetails.destroy({
      where: {
        idCart,
        idProduct
      }
    })
  }
}

module.exports = ShoppingCartService;
