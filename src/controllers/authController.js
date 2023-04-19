const logger = require('../services/loggerService');
const { User, Customer } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../services/responseService');
const customMessages = require('../configs/customMessages');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userInDB = await User.findOne({
      where: {
        username,
      },
    });

    logger.info('User found', { userInDB });
    if (userInDB) {
      const passwordHash = userInDB.password;
      const userData = {
        user_id: userInDB.user_id,
        username: userInDB.username,
        full_name: userInDB.full_name,
        avatar: userInDB.avatar,
        role_id: userInDB.role_id
      }
      const getTimeNow = new Date();
      logger.info('User data', { userData });
      if (bcrypt.compareSync(password,passwordHash)) {
        console.log(true);
        const token = jwt.sign(userData ,'test', {
          expiresIn: getTimeNow.getSeconds() + 60000
        })

        const refreshToken = jwt.sign(userData ,'test', {
          expiresIn: getTimeNow.getSeconds() + 600000
        })
        const updateToken = await User.update({
          refreshToken
        }, {
          where: {
            username
          }
        });
        res.send({token, refreshToken, userData});
      }
    }
  } catch (err) {
    logger.error('Login failed', {err});
    res.send(err);
  }
};

exports.getIdentity = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const user = await User.findOne({
      where: {
        user_id: userId
      },
      attributes: {
        exclude: ['password', 'reset_password_token', 'reset_token_expires','refresh_token'],
      },
    })
    if (user) {
      logger.info('User found', { user });
      return response.respondOk(res, user);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Cannot get user identity', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInDB = await Customer.findOne({
      where: {
        email,
      },
    });

    logger.info('Custoemr found', { userInDB });
    if (userInDB) {
      const passwordHash = userInDB.password;
      const userData = {
        user_id: userInDB.user_id,
        email: userInDB.email,
        full_name: userInDB.full_name,
        avatar: userInDB.avatar,
        role_id: userInDB.role_id
      }
      console.log('test 95')
      const getTimeNow = new Date();
      logger.info('Customer data', { userData });
      if (bcrypt.compareSync(password,passwordHash)) {
        console.log(true);
        const token = jwt.sign(userData ,'test', {
          expiresIn: getTimeNow.getSeconds() + 60000
        })

        const refreshToken = jwt.sign(userData ,'test', {
          expiresIn: getTimeNow.getSeconds() + 600000
        })
        const updateToken = await Customer.update({
          refreshToken
        }, {
          where: {
            email
          }
        });
        console.log('test');
        console.log(token)
        res.send({token, refreshToken, userData});
      } else {
        console.log('abc')
      }
    }
  } catch (err) {
    logger.error('Login failed', {err});
    res.send(err);
  }
};

exports.getCustomerIdentity = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const user = await Customer.findOne({
      where: {
        user_id: userId
      },
      attributes: {
        exclude: ['password', 'reset_password_token', 'reset_token_expires','refresh_token'],
      },
    })
    if (user) {
      logger.info('Customer found', { user });
      return response.respondOk(res, user);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Cannot get customer identity', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}
