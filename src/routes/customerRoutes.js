const express = require("express");

const router = express.Router();
const service1Controller = require('../controllers/service1');
const customerController = require('../controllers/customerController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  customerPasswordSchema, customerCreateSchema, customerDeleteSchema, customerUpdateSchema
} = require('../middlewares/schemas/customerSchemas');

const { uploadAvatar } = require('../services/uploadFileService');
const { isAuthorization } = require("../middlewares/authorization");
const { ROLES } = require("../configs/ms-constants");

// customer routes

router.get('/service1/customer', isAuthenticated, customerController.getCustomer);

router.get('/service1/customer/:username', isAuthenticated, customerController.getOneCustomer);

router.put('/service1/customer/:user_id', isAuthenticated, uploadAvatar.single('avatar'), customerController.updateCustomer);

router.put('/service1/customer/password', isAuthenticated, validator(customerPasswordSchema), customerController.updateCustomerPassword);

router.post('/service1/customer',  isAuthenticated,uploadAvatar.single('avatar'), isAuthorization([ROLES.ADMIN]), customerController.createCustomer);

router.delete('/service1/customer/:user_id', isAuthenticated,customerController.deleteCustomer);

router.post('/service1/reset-password/:token' ,customerController.resetPassword);

router.post('/service1/forgot-password', customerController.forgotPassword);

module.exports = router;
