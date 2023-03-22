const jwt = require('jsonwebtoken');
const logger = require('../services/loggerService');
const messages = require('../configs/customMessages');
const geoip = require('geoip-lite')
const response = require('../services/responseService');

exports.isAuthenticated = async (req ,res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      req.user = jwt.verify(token, 'test');
      logger.info(`Authenticated : `, { ...req.user });
    } else {
      return response.respondNotAuthorized(res, ['Missing data in token payload']);
    }

    const ipAddress = req.headers['x-forwarded-for'] || (req.connection && req.connection.remoteAddress);
    if (ipAddress !== undefined) {
      const geo = geoip.lookup(ipAddress);
      if (geo && geo.country !== undefined) {
        logger.info('Authenticated user country', { authClientCountry: geo.country });
      }
    }
    return next();
  } catch (err) {
    logger.error('Authenticated error', { err });    
    return response.respondNotAuthorized(res, ['Not Authorized']);
  }

}
