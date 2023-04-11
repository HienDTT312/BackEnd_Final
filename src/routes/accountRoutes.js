const express = require("express");

const router = express.Router();
const projectController = require('../controllers/project');
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

router.get('/project/user', isAuthenticated, accountController.getUser);

router.get('/project/user/:username', isAuthenticated, accountController.getOneUser);

router.put('/project/user/:user_id', isAuthenticated, uploadAvatar.single('avatar'), accountController.updateUser);

router.put('/project/user/password', isAuthenticated, validator(userPasswordSchema), accountController.updateUserPassword);

router.post('/project/user',  isAuthenticated,uploadAvatar.single('avatar'), isAuthorization([ROLES.ADMIN]), accountController.createUser);

router.delete('/project/user/:user_id', isAuthenticated,accountController.deleteUser);

router.post('/project/reset-password/:token' ,accountController.resetPassword);

router.post('/project/forgot-password', accountController.forgotPassword);

module.exports = router;
