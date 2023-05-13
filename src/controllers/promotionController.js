const logger = require('../services/loggerService');
const { User, Role, Promotion } = require('../models');
const response = require('../services/responseService');
const customMessages = require('../configs/customMessages');

exports.getPromotion = async (req, res) => {
  try {
    const result = await Promotion.findAll();
    if (result) {
      logger.info('Promotion list', {promotion: result});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.promotionNotFound]);
  } catch (err) {
    logger.error('Cannot get promotion list', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createPromotion = async (req, res) => {
  try {
    const data = req.body;
    console.log('test', data)
    const promotion = await Promotion.create(data);
    if (promotion) {
      logger.info('Promotion created success', { promotion });
      return response.respondOk(res, promotion);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Categogy create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOnePromotion = async (req, res, next) => {
  try {
    const promotion_id = req.params.promotion_id;
    const promotion = await Promotion.findOne({
      where: {
        promotion_id,
      }
    });
    if (promotion) {
      logger.info('Promotion found', { promotion });
      return response.respondOk(res, promotion);
    };
    return response.respondInternalServerError(res, [customMessages.errors.promotionNotFound]);
  } catch (err) {
    logger.error('Failed to get promotion', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updatePromotion = async (req, res) => {
  try {
    const data = req.body;
    console.log("abc", data);
    console.log('123', req.params.promotion_id)
    const promotion = await Promotion.findOne({
      where: {
        promotion_id: req.params.promotion_id
      },
    });

    console.log(promotion)

    if (!promotion) {
      logger.info('Promotion found');
      return response.respondInternalServerError(res, [customMessages.errors.promotionNotFound]);
    }

     // console.log('Test')
    const updatePromotion = await Promotion.update({
      description: data.description,
      titlle: data.title,
      discount: data.discount,
      supplier_id: data.supplier_id,
      category_id: data.category_id,
      updated_date: new Date()
    }, {
      where: {
        promotion_id: 7,
      }
    });

    logger.info('Promotion found', { updatePromotion });
    return response.respondOk(res, updatePromotion);
  } catch (err) {
    logger.error('Failed to update promotion', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.deletePromotion = async (req, res) => {
  try {
    const promotion_id = req.params.promotion_id;
    const result = await Promotion.destroy({ where: {
      promotion_id,
    } });

    if (result) {
      logger.info('Promotion deleted', { result });
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Promotion delete failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}
