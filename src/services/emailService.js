const nodemailer = require('nodemailer');
const config = require('../configs/config');
const { accountCreatedTemplate, resetPasswordTemplate, productCreatedTemplate, productCommentTemplate } = require('../utils/emailTemplate');
const emailSlugConstants = require('../configs/emailSlugs');
const logger = require('./loggerService');

const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});

exports.sendEmail = async (data) => {
  try {
    let email;
    if (data.email_slug === emailSlugConstants.EMAIL_SLUGS.ACCOUNT_CREATED) {
      const mailOption = {
        from: config.email.user,
        to: data.username,
        subject: 'Account created successful',
        text: 'Welcome',
        html: accountCreatedTemplate('Account created', data.username, data.password),
      }

      email = transporter.sendMail(mailOption, function(error, info){
        if (error) {
          logger.error('Email send failed', error);
        } else {
         logger.info('Email sent: ' + info.response);
        }
      });
    } else if (data.email_slug === emailSlugConstants.EMAIL_SLUGS.PASSWORD_RESET) {
      const mailOption = {
        from: config.email.user,
        to: data.username,
        subject: 'Your Account password reset link',
        text: 'Welcome',
        html: resetPasswordTemplate('Your Account password reset link', data.full_name, data.reset_password_token),
      }

      email = transporter.sendMail(mailOption, function(error, info){
        if (error) {
          logger.error('Email send failed', error);
        } else {
         logger.info('Email sent: ' + info.response);
        }
      });
    } else if (data.email_slug === emailSlugConstants.EMAIL_SLUGS.IDEA_CREATED) {
      const mailOption = {
        from: config.email.user,
        to: data.username,
        subject: `${data.full_name} added has submitted new product to your`,
        text: 'Welcome',
        html: productCreatedTemplate(data.full_name, data.title, data.description, data.id, data.created_date),
      }

      email = transporter.sendMail(mailOption, function(error, info){
        if (error) {
          logger.error('Email send failed', error);
        } else {
         logger.info('Email sent: ' + info.response);
        }
      });
    } else if (data.email_slug === emailSlugConstants.EMAIL_SLUGS.IDEA_COMMENT) {
      const mailOption = {
        from: config.email.user,
        to: data.username,
        subject: `${data.full_name} added has comment in your product`,
        text: 'Comment',
        html: productCommentTemplate(data.full_name, data.avatar, data.comment, data.id, data.created_date),
      }

      email = transporter.sendMail(mailOption, function(error, info){
        if (error) {
          logger.error('Email send failed', error);
        } else {
         logger.info('Email sent: ' + info.response);
        }
      });
    }
  } catch (err) {
    logger.error('Email send failed', err);
  }
}
