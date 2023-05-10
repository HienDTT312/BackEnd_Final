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
// router.get('/project/cart',isAuthenticated, orderController.get);

// router.post('/project/cart', orderController.createCart);

router.get('/project/order',isAuthenticated, orderController.getOrder);

router.get('/project/order/:order_id',isAuthenticated, orderController.getOneOrder);

router.get('/project/detail/:order_id',isAuthenticated, orderController.getOneOrderDetail);

router.put('/project/order', isAuthenticated,orderController.updateOrder);

router.post('/project/order',isAuthenticated, orderController.createOrder);

router.delete('/project/order/:order_id', isAuthenticated, orderController.deleteOrder);

router.post('/project/order/create_payment_url', orderController.vnpay);
// router.delete('/patient/detail/:detail_id', isAuthenticated, detailController.deletePayment);

router.get('/project/order/vnpay_return', orderController.vnpayReturn);


module.exports = router;
