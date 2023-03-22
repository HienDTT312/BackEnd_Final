const customMessages = require("../configs/customMessages");
const { ROLES } = require("../configs/ms-constants");
const loggerInstance = require("../services/loggerService");
const response = require('../services/responseService');

exports.isAuthorization = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role_id;
    if (roles.includes(userRole) || userRole === ROLES.ADMIN) {
      loggerInstance.info(`User is granted`);
      next();
    } else {
      loggerInstance.error('User cannot access this route');
      return response.respondNotAuthorized(res, [customMessages.errors.unauthorizedActionInThisEnvironment]);
    }
  }
}
