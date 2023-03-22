const logger = require('../services/loggerService');
const { User, Role, Aggrement } = require('../models');
const response = require('../services/responseService');
const customMessages = require('../configs/customMessages');

exports.getAggrement = async (req, res) => {
  try {
    const result = await Aggrement.findAll();
    if (result) {
      logger.info('Aggrement list', {aggrement: result});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.aggrementNotFound]);
  } catch (err) {
    logger.error('Cannot get aggrement list', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createAggrement = async (req, res) => {
  try {
    const data = req.body;
    const aggrement = await Aggrement.create(data);
    if (aggrement) {
      logger.info('Aggrement created success', { aggrement });
      return response.respondOk(res, aggrement);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Categogy create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneAggrement = async (req, res, next) => {
  try {
    const aggrement_id = req.params.aggrement_id;
    const aggrement = await Aggrement.findOne({
      where: {
        aggrement_id,
      }
    });
    if (aggrement) {
      logger.info('Aggrement found', { aggrement });
      return response.respondOk(res, aggrement);
    };
    return response.respondInternalServerError(res, [customMessages.errors.aggrementNotFound]);
  } catch (err) {
    logger.error('Failed to get aggrement', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateAggrement = async (req, res) => {
  try {
    const data = req.body;
    const aggrement = await Aggrement.findOne({
      where: {
        aggrement_id: data.aggrement_id
      },
    });

    if (!aggrement) {
      logger.info('Aggrement found');
      return response.respondInternalServerError(res, [customMessages.errors.aggrementNotFound]);
    }

     // console.log('Test')
    data.updated_date = new Date();
    const updateAggrement = await Aggrement.update(data, {
      where: {
        aggrement_id: data.aggrement_id,
      }
    });

    logger.info('Aggrement found', { updateAggrement });
    return response.respondOk(res, updateAggrement);
  } catch (err) {
    logger.error('Failed to update aggrement', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.deleteAggrement = async (req, res) => {
  try {
    const aggrement_id = req.params.aggrement_id;
    const result = await Aggrement.destroy({ where: {
      aggrement_id,
    } });

    if (result) {
      logger.info('Aggrement deleted', { result });
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Aggrement delete failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}
