const logger = require('../services/loggerService');
const { User, Role, Order, Detail } = require('../models');
const response = require('../services/responseService');
const customMessages = require('../configs/customMessages');

exports.getOrder = async (req, res) => {
  try {
    const result = await Order.findAll();
    if (result) {
      logger.info('Order list', {order: result});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.orderNotFound]);
  } catch (err) {
    logger.error('Cannot get order list', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createOrder = async (req, res) => {
  try {
    const data = req.body;
    const order = await Order.create(data);
    if (order) {
      logger.info('Order created success', { order });
      return response.respondOk(res, order);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Categogy create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneOrder = async (req, res, next) => {
  try {
    const order_id = req.params.order_id;
    const order = await Order.findOne({
      where: {
        order_id,
      }
    });
    if (order) {
      logger.info('Order found', { order });
      return response.respondOk(res, order);
    };
    return response.respondInternalServerError(res, [customMessages.errors.orderNotFound]);
  } catch (err) {
    logger.error('Failed to get order', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneOrderDetail = async (req, res, next) => {
  try {
    const order_id = req.params.order_id;
    const order = await Detail.findOne({
      where: {
        order_id,
      }
    });
    if (order) {
      logger.info('Detail found', { order });
      return response.respondOk(res, order);
    };
    return response.respondInternalServerError(res, [customMessages.errors.orderNotFound]);
  } catch (err) {
    logger.error('Failed to get order', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateOrder = async (req, res) => {
  try {
    const data = req.body;
    const order = await Order.findOne({
      where: {
        order_id: data.order_id
      },
    });

    if (!order) {
      logger.info('Order found');
      return response.respondInternalServerError(res, [customMessages.errors.orderNotFound]);
    }

     // console.log('Test')
    data.updated_date = new Date();
    const updateOrder = await Order.update(data, {
      where: {
        order_id: data.order_id,
      }
    });

    logger.info('Order found', { updateOrder });
    return response.respondOk(res, updateOrder);
  } catch (err) {
    logger.error('Failed to update order', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.deleteOrder = async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const result = await Order.destroy({ where: {
      order_id,
    } });

    if (result) {
      logger.info('Order deleted', { result });
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Order delete failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}
