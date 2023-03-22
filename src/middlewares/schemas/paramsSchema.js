const Joi = require('@hapi/joi');

/**
 * User params validator schema
 */
const userId = Joi.object({
  user_id: Joi.number().required(),
});

/**
 * Update virtual account params validator schema
 */
const updateVirtual = userId.keys({
  virtual_id: Joi.number().positive().required(),
});

/**
 * Account params validator schema
 */
const accountId = userId.keys({
  mt5_id: Joi.number().required(),
});

/**
 * Account params validator schema
 */
const resetPassword = userId.keys({
  ctrader_id: Joi.number().required(),
});

module.exports = {
  userId,
  updateVirtual,
  accountId,
  resetPassword,
};
