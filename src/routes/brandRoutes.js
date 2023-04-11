const express = require("express");

const router = express.Router();
const brandController = require('../controllers/brandController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');
const { isAuthorization } = require("../middlewares/authorization");
const { ROLES } = require("../configs/ms-constants");

// brand route

router.get('/project/brand',isAuthenticated, brandController.getBrand);

router.get('/project/brand/:brand_id',isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),brandController.getOneBrand);

router.put('/project/brand', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),brandController.updateBrand);

router.post('/project/brand', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),brandController.createBrand);

router.delete('/project/brand/:brand_id', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]), brandController.deleteBrand);

module.exports = router;
