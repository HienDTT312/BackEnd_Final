const express = require("express");

const router = express.Router();
const service1Controller = require('../controllers/service1');
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/authentication');

router.post('/service1/login', authController.login)

router.get('/service1/test', service1Controller.service1Test);

router.get('/service1/identity', isAuthenticated, authController.getIdentity);

module.exports = router;
