const express = require("express");

const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');
const { isAuthorization } = require("../middlewares/authorization");
const { ROLES } = require("../configs/ms-constants");

// supplier route

router.get('/service1/supplier',isAuthenticated, supplierController.getSupplier);

router.get('/service1/supplier/:supplier_id',isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),supplierController.getOneSupplier);

router.put('/service1/supplier', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),supplierController.updateSupplier);

router.post('/service1/supplier', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),supplierController.createSupplier);

router.delete('/service1/supplier/:supplier_id', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]), supplierController.deleteSupplier);

module.exports = router;
