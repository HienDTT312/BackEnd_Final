const crypto = require('crypto');

const generatePassword = () => {
  let password;
  do {
    password = crypto.randomBytes(4).toString('hex');
  } while (!password.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/));
  return password;
};

module.exports = {
  generatePassword,
}