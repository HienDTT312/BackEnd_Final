const express = require("express");

const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');
const { isAuthorization } = require("../middlewares/authorization");
const { ROLES } = require("../configs/ms-constants");

// order route

router.get('/project/order',isAuthenticated, orderController.getOrder);

router.get('/project/order/:order_id',isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),orderController.getOneOrder);

router.put('/project/order', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),orderController.updateOrder);

router.post('/project/order', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),orderController.createOrder);

router.delete('/project/order/:order_id', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]), orderController.deleteOrder);

module.exports = router;
