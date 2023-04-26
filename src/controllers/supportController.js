const logger = require('../services/loggerService');
const { User, Role, Support } = require('../models');
const response = require('../services/responseService');
const customMessages = require('../configs/customMessages');

exports.getSupport = async (req, res) => {
  try {
    const result = await Support.findAll();
    if (result) {
      logger.info('Support list', {support: result});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.supportNotFound]);
  } catch (err) {
    logger.error('Cannot get support list', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createSupport = async (req, res) => {
  try {
    const data = req.body;
    const support = await Support.create(data);
    if (support) {
      logger.info('Support created success', { support });
      return response.respondOk(res, support);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Categogy create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneSupport = async (req, res, next) => {
  try {
    const support_id = req.params.support_id;
    const support = await Support.findOne({
      where: {
        support_id,
      }
    });
    if (support) {
      logger.info('Support found', { support });
      return response.respondOk(res, support);
    };
    return response.respondInternalServerError(res, [customMessages.errors.supportNotFound]);
  } catch (err) {
    logger.error('Failed to get support', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateSupport = async (req, res) => {
  try {
    const data = req.body;
    const support = await Support.findOne({
      where: {
        support_id: data.support_id
      },
    });

    if (!support) {
      logger.info('Support found');
      return response.respondInternalServerError(res, [customMessages.errors.supportNotFound]);
    }

     // console.log('Test')
    data.updated_date = new Date();
    const updateSupport = await Support.update(data, {
      where: {
        support_id: data.support_id,
      }
    });

    logger.info('Support found', { updateSupport });
    return response.respondOk(res, updateSupport);
  } catch (err) {
    logger.error('Failed to update support', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.deleteSupport = async (req, res) => {
  try {
    const support_id = req.params.support_id;
    const result = await Support.destroy({ where: {
      support_id,
    } });

    if (result) {
      logger.info('Support deleted', { result });
      return response.respondOk(res, result);
    }
    return response.respondOk(res, result);
  } catch (err) {
    logger.error('Support delete failed', {err});
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}
