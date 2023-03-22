const express = require("express");

const router = express.Router();
const service1Controller = require('../controllers/service1');
const accountController = require('../controllers/accountController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');

const { uploadAvatar } = require('../services/uploadFileService');
const { isAuthorization } = require("../middlewares/authorization");
const { ROLES } = require("../configs/ms-constants");

// user routes

router.get('/service1/user', isAuthenticated, accountController.getUser);

router.get('/service1/user/:username', isAuthenticated, accountController.getOneUser);

router.put('/service1/user/:user_id', isAuthenticated, uploadAvatar.single('avatar'), accountController.updateUser);

router.put('/service1/user/password', isAuthenticated, validator(userPasswordSchema), accountController.updateUserPassword);

router.post('/service1/user',  isAuthenticated,uploadAvatar.single('avatar'), isAuthorization([ROLES.ADMIN]), accountController.createUser);

router.delete('/service1/user/:user_id', isAuthenticated,accountController.deleteUser);

router.post('/service1/reset-password/:token' ,accountController.resetPassword);

router.post('/service1/forgot-password', accountController.forgotPassword);

module.exports = router;
