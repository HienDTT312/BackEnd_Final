const express = require("express");

const router = express.Router();
const cartController = require('../controllers/cartController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');
const { isAuthorization } = require("../middlewares/authorization");
const { ROLES } = require("../configs/ms-constants");

// cart route

router.get('/project/cart',isAuthenticated, cartController.getCart);

router.get('/project/cart/:cart_id',isAuthenticated,cartController.getOneCart);

router.put('/project/cart', isAuthenticated, cartController.updateCart);

router.post('/project/cart', isAuthenticated, cartController.createCart);

router.delete('/project/cart/:cart_id', isAuthenticated, cartController.deleteCart);

module.exports = router;
