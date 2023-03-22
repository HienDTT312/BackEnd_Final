const response = require('../services/responseService');
const logger = require('../services/loggerService');

/**
 * Validate body request
 * @param {Object} schema - Joi object schema
 */
const validator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  console.log(req.body)
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    logger.error('validation error', { errorMessages });
    return response.respondBadRequest(res, errorMessages);
  }
  return next();
};

/**
 * Validate params request
 * @param {Object} schema - Joi object schema
 */
const paramsValidator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.params);
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    logger.error('validation error', { errorMessages });
    return response.respondBadRequest(res, errorMessages);
  }
  return next();
};

/**
 * Validate both params and body
 * @param {*} schema - Joi object schema
 */
const paramsBodyValidator = (schema) => (req, res, next) => {
  const { error } = schema.validate({ ...req.params, ...req.body });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    logger.error('validation error', { errorMessages });
    return response.respondBadRequest(res, errorMessages);
  }
  return next();
};

module.exports = {
  validator,
  paramsValidator,
  paramsBodyValidator,
};
