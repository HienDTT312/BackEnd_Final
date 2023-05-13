const express = require("express");

const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');
const { ROLES } = require("../configs/ms-constants");
const { isAuthorization } = require("../middlewares/authorization");

// category route

router.get('/project/category', categoryController.getCategory);

router.get('/project/category/:category_id',isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]), categoryController.getOneCategory);

router.put('/project/category', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]), categoryController.updateCategory);

router.post('/project/category', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]), categoryController.createCategory);

router.delete('/project/category/:category_id', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]), categoryController.deleteCategory);

module.exports = router;
