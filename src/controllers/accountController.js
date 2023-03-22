const logger = require('../services/loggerService');
const { User, Role } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../services/responseService');
const { generateHashPassword } = require('../services/generateBcrypt');
const customMessages = require('../configs/customMessages');
const { generatePassword } = require('../services/generatePassword');
const emailService = require('../services/emailService.js');
const { email } = require('../configs/config');
const { EMAIL_SLUGS } = require('../configs/emailSlugs');
const crypto = require('crypto');
const config = require('../configs/config');
const fs = require('fs');
const path = require('path');
const e = require('cors');

exports.getUser = async (req, res) => {
  try {
    const where = {};
    const pageNumber = req.query.page;

    if (req.query.user_id) {
      where.user_id = req.query.user_id;
    }

    if (req.query.gender) {
      where.gender = req.query.gender;
    }

    if (req.query.profile_status) {
      where.profile_status = req.query.profile_status;
    }

    if (req.query.role_id) {
      where.role_id = req.query.role_id;
    }

    const result = await User.findAndCountAll({
      where,
    });
    if (result) {
      logger.info('Account list', {user: result});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.accountNotFound]);
  } catch (err) {
    logger.error('Cannot get account list', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneUser = async (req, res) => {
  try {
    const username = req.params.username;
    const result = await User.findOne({
      where: {
        username
      },
    });
    if (result) {
      logger.info('Account created', {user: result});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.accountNotFound]);
  } catch (err) {
    logger.error('Account create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    const hashedPassword = await generateHashPassword(data.password);
    const payload = {
      username: data.username,
      full_name: data.full_name,
      last_name:  data.last_name,
      first_name: data.first_name,
      phone: data.phone,
      role_id: data.role_id,
      password: hashedPassword,
      gender: data.gender,
    }

    if (req.file) {
      payload.avatar = 'img/' + req.file.filename || ''
    } else {
      if (data.gender && data.gender === 'female') {
        payload.avatar = 'img/female.jpg';
      } else {
        payload.avatar = 'img/male.jpg';
      }
    }

    const checkUsernameExist = await User.findOne({
      where: {
        username: data.username,
      }
    })

    if (checkUsernameExist) {
      logger.error('Username existed in the system', { username: checkUsernameExist });
      return response.respondInternalServerError(res, [customMessages.errors.userNameExisted]);
    }

    logger.debug('Payload for create', { payload });
    const result = await User.create(payload);
    if (result) {
      const sendEmail = await emailService.sendEmail({
        password: data.password,
        username: data.username,
        email_slug: EMAIL_SLUGS.ACCOUNT_CREATED,
      });

      logger.info('Account created', {user: result});
      return response.respondOk(res, result);
    }
    logger.info('Account create failed');
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Account create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const data = req.body;
    const updateData = {
      full_name: data.full_name,
      last_name: data.last_name,
      first_name: data.first_name,
      phone: data.phone,
      role_id: data.role_id,
      avatar: data.avatar,
      gender: data.gender,
      updated_date: new Date(),
    }

    if (req.file) {
      updateData.avatar = 'img/' + req.file.filename || ''
    }
    const result = await User.update(updateData, {
      where: {
        user_id: userId
      }
    });
    if (result) {
      logger.info('Account updated', {user: data});
      return response.respondOk(res, result);
    }
    logger.info('Account failed to update');
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Account update failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateUserPassword = async (req, res) => {
  try {
    const data = req.body;
    const hashedPassword = await generateHashPassword(data.password);

    const updateData = {
      password: hashedPassword,
    }

    const result = await User.update(updateData, {
      where: {
        username: data.username
      }
    });
    if (result) {
      logger.info('Account password updated', {user: data});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Account update failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const user = await User.findOne({
      where: {
        user_id,
      }
    });

    if (!user) {
      logger.error('Accout not found');
      return response.respondInternalServerError(res, [customMessages.errors.accountNotFound]);
    }

    const result = await User.destroy({ where: {
      user_id,
    } });

    if (result) {
      let dir;

      if (user.avatar && user.avatar != 'img/female.jpg' && user.avatar != 'img/male.jpg') {
        dir = path.join(__dirname, '/../../public/',user.avatar);
        console.log(dir);
        const avatarDelete = await fs.unlinkSync(dir);
        logger.info('Avatar deleted', { avatarDelete });
      }
      logger.info('User deleted', { result });
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Account delete failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const { new_password: newPassword, confirm_password: confirmPassword } = req.body;
    if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
      // if the password is missing or new and confirm passwords are not matching, return an error
      logger.debug(customMessages.errors.passwordMissingOrNotMatching);
      return response.respondBadRequest(res, [customMessages.errors.passwordMissingOrNotMatching]);
    }
    const token = req.params.token;
    if (!token) {
      logger.debug(customMessages.errors.noTokenInParam);
      return res.status(400).json({ errors: [customMessages.errors.tokenMissingOrExpired] });
    }

    const user = await User.findOne({
      where: {
        reset_password_token: token,
        reset_token_expires: {
          [Op.gt]: Date.now(),
        }
      }
    })

    if (user) {
      user.password = await generateHashPassword(newPassword);
      user.reset_password_token = undefined;
      user.reset_token_expires = undefined;

      await user.save();
      logger.info(`Password reset for user: ${user.username}`);
      return response.respondOk(res, [customMessages.success.passwordHasBeenReset])
    }
  } catch (err) {
    logger.error('Account password reset failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.forgotPassword = async (req, res) => {
    try {
      const { username } = req.body;
      const user = await User.findOne({
        where: {
          username,
        }
      });
      logger.info('User found', {user});
      if (user) {
        const buffer = crypto.randomBytes(48);
        user.reset_password_token = buffer.toString('hex');
        user.reset_token_expires = Date.now() + config.general.resetTokenExpiration * 60 * 1000;

        const savedUser = await user.save();
        logger.info('User reset token created and saved.', { username: savedUser.username, reset_password_token: savedUser.reset_password_token, expires: savedUser.reset_token_expires });
        const sendEmail = await emailService.sendEmail({
          username: savedUser.username,
          reset_password_token: savedUser.reset_password_token,
          email_slug: EMAIL_SLUGS.PASSWORD_RESET,
          full_name: user.full_name,
        });
        return response.respondOk(res, {savedUser});
      }
      return response.respondInternalServerError(res, [customMessages.errors.accountNotFound]);
    } catch (err) {
      logger.info('User reset password failed.', err);
      return response.respondInternalServerError(res, [customMessages.errors.internalError]);
    }
}
