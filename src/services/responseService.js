/**
 * Response service
 * @module services/response
 */
const { errors } = require('../configs/customMessages');

const HTTP_RESPONSE = {
  OK: { code: 200, statusText: 'Ok' },
  CREATED: { code: 201, statusText: 'Created' },
  NOT_FOUND: { code: 404, statusText: 'Not Found' },
  BAD_REQUEST: { code: 400, statusText: 'Bad Request' },
  UNAUTHORIZED: { code: 401, statusText: 'Unauthorized' },
  FORBIDDEN: { code: 403, statusText: 'Forbidden' },
  UNPROCESSABLE_ENTITY: { code: 422, statusText: 'Unprocessable Entity' },
  INTERNAL_SERVER_ERROR: { code: 500, statusText: 'Internal Server Error' },
};;

/**
 * Respond with single item or collection of items
 * @param {Object} res - Express response object
 * @param {Object|Array} data - Single object or and Array of items
 * @param {Object} status - HTTP_RESPONSE object
 * @returns {Object}
 */
const respond = (res, data, status) => {
  if (!data) {
    return this.respondNotFound(res, [errors.objectNotFound]);
  }
  return res.status(status.code).json({ data });
};

/**
 * Respond with errors
 * @param {Object} res - Express response object
 * @param {Array} errorMessages - An Array of error messages
 * @param {Object} status - HTTP_RESPONSE object
 * @returns {Object}
 */
const respondWithErrors = (res, errorMessages, status) => {
  const errorCollection = errorMessages.map((errorMsg) => errorMsg);
  return res.status(status.code).json({ errors: errorCollection });
};

/**
 * Respond with OK.
 * @param {Object} res - Express response object
 * @param {Object|Array} data - Single object or a collection of objects
 * @returns {Object}
 */
exports.respondOk = (res, data) => respond(res, data, HTTP_RESPONSE.OK);

/**
 * Respond with Created.
 * @param {Object} res - Express response object
 * @param {Object|Array} data - Single object or a collection of objects
 * @returns {Object}
 */
exports.respondCreated = (res, data) => respond(res, data, HTTP_RESPONSE.CREATED);

/**
 * Respond with Bad Request.
 * @param {Object} res - Express response object
 * @param {Array} errorMessages - An Array of error messages.
 * @returns {Object}
 */
exports.respondBadRequest = (res, errorMessages) => respondWithErrors(
  res, errorMessages, HTTP_RESPONSE.BAD_REQUEST,
);

/**
 * Respond with Not Found.
 * @param {Object} res - Express response object
 * @param {Array} errorMessages - An Array of error messages.
 * @returns {Object}
 */
exports.respondNotFound = (res, errorMessages) => respondWithErrors(
  res, errorMessages, HTTP_RESPONSE.NOT_FOUND,
);

/**
 * Respond Internal Server Error
 * @param {Object} res - Express response object
 * @param {Array} errorMessages - An Array of error messages.
 * @returns {Object}
 */
exports.respondInternalServerError = (res, errorMessages) => respondWithErrors(
  res, errorMessages, HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
);

/**
 * Respond Not Authorized
 * @param {Object} res - Express response object
 * @param {Array} errorMessages - An Array of error messages.
 * @returns {Object}
 */
exports.respondNotAuthorized = (res, errorMessages) => respondWithErrors(
  res, errorMessages, HTTP_RESPONSE.UNAUTHORIZED,
);
