const logger = require('../services/loggerService');
const { User, Role, Cart } = require('../models');
const response = require('../services/responseService');
const customMessages = require('../configs/customMessages');

exports.getCart = async (req, res) => {
  try {
    const result = await Cart.findAll();
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
    const data = req.body;

    const productInCart = await Cart.findAll({
      where: {
        user_id: data.user_id,
        product: data.product_id,
      }
    });

    if (productInCart) {
      data.amount = data.amount + productInCart.amount;
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
