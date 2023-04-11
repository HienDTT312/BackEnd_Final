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

router.get('/project/supplier',isAuthenticated, supplierController.getSupplier);

router.get('/project/supplier/:supplier_id',isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),supplierController.getOneSupplier);

router.put('/project/supplier', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),supplierController.updateSupplier);

router.post('/project/supplier', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),supplierController.createSupplier);

router.delete('/project/supplier/:supplier_id', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]), supplierController.deleteSupplier);

module.exports = router;
