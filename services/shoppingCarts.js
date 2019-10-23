const { shoppingCartDetails, shoppingCarts, products: productsDB } = require('./../db')();

class ShoppingCartService {
  async getShoppingCart(id) {
    let res = await shoppingCarts.findOne({
      where: {
        id
      },
      attributes: ['id'],
      include: [
        { association: 'products', attributes: ['id'] ,include: [ { association: 'product' }] }
      ]
    })
    
    if (!res) 
      throw new Error('Not Found: no existe el carrito de compras que estas buscando')
    res = res.get({ plain: true })


    return {
      ...res,
      products: res.products.map(product => product.product)
    };
  }

  /**
   * @param {number[]} products array od products ids
   */
  async create(products) {
    // check if product alrady exists in DB
    const exitsPromises = products.map(async (idProduct) => {
      const count = await productsDB.count({ where: { id: idProduct } });
      if (count) return true;
      throw new Error(`Bad Request: No existe ningun producto con id ${idProduct}`);
    });

    await Promise.all(exitsPromises);

    let cart = await shoppingCarts.create({});
    cart = cart.get({ plain: true });

    const details = products.map((idProduct) => ({
      idProduct,
      idCart: cart.id,
    }));

    await shoppingCartDetails.bulkCreate(details);

    return {
      id: cart.id,
      products,
    };
  }

  /**
   * @param {object} param
   * @param {number} param.idCart
   * @param {number} param.idProduct
   */
  deleteCartItem({ idCart, idProduct }) {
    return shoppingCartDetails.destroy({
      where: {
        idCart,
        idProduct,
      },
    });
  }
}

module.exports = ShoppingCartService;
