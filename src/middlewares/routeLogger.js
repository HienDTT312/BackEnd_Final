const logger = require('../services/loggerService');

/**
 * log every route called
 * @param {Object} req The request parameter
 * @param {Object} res The response parameter
 * @param {Object} next The middleware parameter
 */
module.exports = (req, res, next) => {
  const sanitizedBody = { ...req.body };
  const sanitizedParams = { ...req.params };
  const sanitizedQuery = { ...req.query };

  delete sanitizedBody.password;
  delete sanitizedParams.password;
  delete sanitizedQuery.password;

  logger.info('Route called.', {
    method: req.method,
    path: req.path,
    body: sanitizedBody,
    params: sanitizedParams,
    query: sanitizedQuery,
  });
  return next();
};
