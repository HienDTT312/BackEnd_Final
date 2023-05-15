const logger = require('../services/loggerService');
const { User, Role, Cart, Product, ProductDocument } = require('../models');
const response = require('../services/responseService');
const customMessages = require('../configs/customMessages');

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const result = await Cart.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Product, as: 'product', attributes: ['title', 'amount', 'price'], include: [{
            model: ProductDocument, as:'documents', attributes: ['document']
          }],
        },
      ]
    });


    if (result) {
      logger.info('Cart list', {cart: result});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.cartNotFound]);
  } catch (err) {
    logger.error('Cannot get cart list', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createCart = async (req, res) => {
  try {
    const payload = req.body;

    const data = {...payload};
    const productInCart = await Cart.findOne({
      where: {
        user_id: data.user_id,
        product_id: data.product_id,
      }, raw: true
    });

    const product = await Product.findOne({
      where: {
        product_id: data.product_id
      }
    })
    console.log(productInCart)

    if ((productInCart && product.amount < productInCart.amount && data.amount > productInCart.amount && data.amount !== productInCart.amount)
    || (product && product.amount < data.amount && data.amount > productInCart.amount && data.amount !== productInCart.amount)
    || (productInCart && data.amount !== productInCart.amount && data.amount > productInCart.amount && (product.amount + productInCart.amount) < data.amount)) {
    console.log(product);
    console.log(productInCart);
    return response.respondInternalServerError(res, ["Not enough amount"]);
  }

    // if (product && product.amount < productInCart.amount) {
    //   console.log(product);
    //   console.log(productInCart);
    //   return response.respondInternalServerError(res, ["Not enough amount"]);
    // }

    if (productInCart) {
      const amount = parseInt(data.amount, 10) + parseInt(productInCart.amount, 10);
      const cart = await Cart.update({
        amount: amount,
      }, {
        where: {
          cart_id: productInCart.cart_id,
        }
      });
      if (cart) {
        logger.info('Cart created success', { cart });
        return response.respondOk(res, cart);
      }
    }


    const cart = await Cart.create(data);
    if (cart) {
      logger.info('Cart created success', { cart });
      return response.respondOk(res, cart);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Categogy create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneCart = async (req, res, next) => {
  try {
    const cart_id = req.params.cart_id;
    const cart = await Cart.findOne({
      where: {
        cart_id,
      }
    });

    console.log(cart)
    if (cart) {
      logger.info('Cart found', { cart });
      return response.respondOk(res, cart);
    };
    return response.respondInternalServerError(res, [customMessages.errors.cartNotFound]);
  } catch (err) {
    logger.error('Failed to get cart', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateCart = async (req, res) => {
  try {
    const data = req.body;
    const cart = await Cart.findOne({
      where: {
        cart_id: data.cart_id
      },
    });

    const productInCart = await Cart.findOne({
      where: {
        cart_id: data.cart_id,
      }, raw: true
    });

    if (productInCart) {
      const product = await Product.findOne({
        where: {
          product_id: productInCart.cart_id
        }
      });
      if ((productInCart && product.amount < productInCart.amount && data.amount > productInCart.amount && data.amount !== productInCart.amount)
      || (product && product.amount < data.amount && data.amount > productInCart.amount && data.amount !== productInCart.amount)
      || (productInCart && data.amount !== productInCart.amount && data.amount > productInCart.amount && (product.amount + productInCart.amount) < data.amount)) {
          console.log(product);
        console.log(productInCart);
        return response.respondInternalServerError(res, ["Not enough amount"]);
      }
    }





    if (!cart) {
      logger.info('Cart found');
      return response.respondInternalServerError(res, [customMessages.errors.cartNotFound]);
    }

     // console.log('Test')
    data.updated_date = new Date();
    const updateCart = await Cart.update(data, {
      where: {
        cart_id: data.cart_id,
      }
    });

    logger.info('Cart found', { updateCart });
    return response.respondOk(res, updateCart);
  } catch (err) {
    logger.error('Failed to update cart', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.deleteCart = async (req, res) => {
  try {
    const cart_id = req.params.cart_id;
    const result = await Cart.destroy({ where: {
      cart_id,
    } });

    if (result) {
      logger.info('Cart deleted', { result });
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Cart delete failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}
