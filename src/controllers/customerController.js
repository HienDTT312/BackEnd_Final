const logger = require('../services/loggerService');
const { Customer, Role } = require('../models');
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

exports.getCustomer = async (req, res) => {
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

    const result = await Customer.findAndCountAll({
      where,
    });
    if (result) {
      logger.info('Customer list', {customer: result});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.customerNotFound]);
  } catch (err) {
    logger.error('Cannot get customer list', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneCustomer = async (req, res) => {
  try {
    const email = req.params.email;
    const result = await Customer.findOne({
      where: {
        email
      },
    });
    if (result) {
      logger.info('Customer created', {customer: result});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.customerNotFound]);
  } catch (err) {
    logger.error('Customer create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createCustomer = async (req, res) => {
  try {
    const data = req.body;
    const hashedPassword = await generateHashPassword(data.password);
    const payload = {
      email: data.email,
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

    const checkCustomernameExist = await Customer.findOne({
      where: {
        email: data.email,
      }
    })

    if (checkCustomernameExist) {
      logger.error('Customername existed in the system', { email: checkCustomernameExist });
      return response.respondInternalServerError(res, [customMessages.errors.customerNameExisted]);
    }

    logger.debug('Payload for create', { payload });
    const result = await Customer.create(payload);
    if (result) {
      const sendEmail = await emailService.sendEmail({
        password: data.password,
        email: data.email,
        email_slug: EMAIL_SLUGS.ACCOUNT_CREATED,
      });

      logger.info('Customer created', {customer: result});
      return response.respondOk(res, result);
    }
    logger.info('Customer create failed');
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Customer create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateCustomer = async (req, res) => {
  try {
    // const customerId = req.params.user_id;
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
    const result = await Customer.update(updateData, {
      where: {
        email: data.email
      }
    });
    if (result) {
      logger.info('Customer updated', {customer: data});
      return response.respondOk(res, result);
    }
    logger.info('Customer failed to update');
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Customer update failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateCustomerPassword = async (req, res) => {
  try {
    const data = req.body;
    const hashedPassword = await generateHashPassword(data.password);

    const updateData = {
      password: hashedPassword,
    }

    const result = await Customer.update(updateData, {
      where: {
        email: data.email
      }
    });
    if (result) {
      logger.info('Customer password updated', {customer: data});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Customer update failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.deleteCustomer = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const customer = await Customer.findOne({
      where: {
        user_id,
      }
    });

    if (!customer) {
      logger.error('Accout not found');
      return response.respondInternalServerError(res, [customMessages.errors.customerNotFound]);
    }

    const result = await Customer.destroy({ where: {
      user_id,
    } });

    if (result) {
      let dir;

      if (customer.avatar && customer.avatar != 'img/female.jpg' && customer.avatar != 'img/male.jpg') {
        dir = path.join(__dirname, '/../../public/',customer.avatar);
        console.log(dir);
        const avatarDelete = await fs.unlinkSync(dir);
        logger.info('Avatar deleted', { avatarDelete });
      }
      logger.info('Customer deleted', { result });
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Customer delete failed', err);
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

    const customer = await Customer.findOne({
      where: {
        reset_password_token: token,
        reset_token_expires: {
          [Op.gt]: Date.now(),
        }
      }
    })

    if (customer) {
      customer.password = await generateHashPassword(newPassword);
      customer.reset_password_token = undefined;
      customer.reset_token_expires = undefined;

      await customer.save();
      logger.info(`Password reset for customer: ${customer.email}`);
      return response.respondOk(res, [customMessages.success.passwordHasBeenReset])
    }
  } catch (err) {
    logger.error('Customer password reset failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const customer = await Customer.findOne({
        where: {
          email,
        }
      });
      logger.info('Customer found', {customer});
      if (customer) {
        const buffer = crypto.randomBytes(48);
        customer.reset_password_token = buffer.toString('hex');
        customer.reset_token_expires = Date.now() + config.general.resetTokenExpiration * 60 * 1000;

        const savedCustomer = await customer.save();
        logger.info('Customer reset token created and saved.', { email: savedCustomer.email, reset_password_token: savedCustomer.reset_password_token, expires: savedCustomer.reset_token_expires });
        const sendEmail = await emailService.sendEmail({
          email: savedCustomer.email,
          reset_password_token: savedCustomer.reset_password_token,
          email_slug: EMAIL_SLUGS.PASSWORD_RESET,
          full_name: customer.full_name,
        });
        return response.respondOk(res, {savedCustomer});
      }
      return response.respondInternalServerError(res, [customMessages.errors.customerNotFound]);
    } catch (err) {
      logger.info('Customer reset password failed.', err);
      return response.respondInternalServerError(res, [customMessages.errors.internalError]);
    }
}
