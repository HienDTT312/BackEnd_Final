const logger = require('../services/loggerService');
const { User, Role, Brand } = require('../models');
const response = require('../services/responseService');
const customMessages = require('../configs/customMessages');

exports.getBrand = async (req, res) => {
  try {
    const result = await Brand.findAll();
    if (result) {
      logger.info('Brand list', {brand: result});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.brandNotFound]);
  } catch (err) {
    logger.error('Cannot get brand list', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createBrand = async (req, res) => {
  try {
    const data = req.body;
    const brand = await Brand.create(data);
    if (brand) {
      logger.info('Brand created success', { brand });
      return response.respondOk(res, brand);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Categogy create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneBrand = async (req, res, next) => {
  try {
    const brand_id = req.params.brand_id;
    const brand = await Brand.findOne({
      where: {
        brand_id,
      }
    });
    if (brand) {
      logger.info('Brand found', { brand });
      return response.respondOk(res, brand);
    };
    return response.respondInternalServerError(res, [customMessages.errors.brandNotFound]);
  } catch (err) {
    logger.error('Failed to get brand', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateBrand = async (req, res) => {
  try {
    const data = req.body;
    const brand = await Brand.findOne({
      where: {
        brand_id: data.brand_id
      },
    });

    if (!brand) {
      logger.info('Brand found');
      return response.respondInternalServerError(res, [customMessages.errors.brandNotFound]);
    }

     // console.log('Test')
    data.updated_date = new Date();
    const updateBrand = await Brand.update(data, {
      where: {
        brand_id: data.brand_id,
      }
    });

    logger.info('Brand found', { updateBrand });
    return response.respondOk(res, updateBrand);
  } catch (err) {
    logger.error('Failed to update brand', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.deleteBrand = async (req, res) => {
  try {
    const brand_id = req.params.brand_id;
    const result = await Brand.destroy({ where: {
      brand_id,
    } });

    if (result) {
      logger.info('Brand deleted', { result });
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Brand delete failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}
