jest.useFakeTimers();
const {
  User,
  Term,
  Department,
  ProductDocument,
  Product,
  ProductVote,
  View,
  ProductComment
} = require('../../src/models/index');
const productController = require('../../src/controllers/productController');
const {
  IDEA_STATUS
} = require('../../src/configs/ms-constants');
const emailService = require('../../src/services/emailService.js');

const customMessages = require('../../src/configs/customMessages');
const fs = require('fs');
const {
  email
} = require('../../src/configs/config');
const { EMAIL_SLUGS } = require('../../src/configs/emailSlugs');

require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const nodemailer = require('nodemailer');
const { generatePassword } = require('../../src/services/generatePassword');

jest.useFakeTimers()
const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.download = jest.fn().mockReturnValue(res);
  return res;
};

test('Test generate password', () => {
  const password = generatePassword();

  expect(password).not.toBe(null)
})
