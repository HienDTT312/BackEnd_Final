const express = require("express");

const router = express.Router();
const projectController = require('../controllers/project');
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

router.get('/project/customer', customerController.getCustomer);

router.get('/project/customer/:email', customerController.getOneCustomer);

router.put('/project/customer', uploadAvatar.single('avatar'), customerController.updateCustomer);

router.put('/project/customer/password', validator(customerPasswordSchema), customerController.updateCustomerPassword);

router.post('/project/customer',uploadAvatar.single('avatar'), customerController.createCustomer);

router.delete('/project/customer/:user_id',customerController.deleteCustomer);

router.post('/project/reset-password/:token' ,customerController.resetPassword);

router.post('/project/forgot-password', customerController.forgotPassword);

module.exports = router;
