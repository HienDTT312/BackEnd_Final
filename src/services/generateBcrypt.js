const bcrypt = require('bcrypt');
const logger = require('./loggerService');
const saltRounds = 10;
const myPlaintextPassword = '123456789';
const someOtherPlaintextPassword = '123';

exports.generateHashPassword = async (password) => {
  const salt = bcrypt.genSalt(5);
  const result = await bcrypt.hash(password, 10);

  logger.info('Password generated', { result });
  return result;
};
