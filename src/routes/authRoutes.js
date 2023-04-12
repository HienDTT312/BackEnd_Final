const express = require("express");

const router = express.Router();
const projectController = require('../controllers/project');
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/authentication');

router.post('/project/login', authController.login)

router.get('/project/test', projectController.projectTest);

router.get('/project/identity', isAuthenticated, authController.getIdentity);

router.post('/project/customer/login', authController.loginCustomer)

router.get('/project/customer/identity', isAuthenticated, authController.getCustomerIdentity);

module.exports = router;
