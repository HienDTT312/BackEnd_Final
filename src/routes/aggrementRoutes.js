const express = require("express");

const router = express.Router();
const aggrementController = require('../controllers/aggrementController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');
const { isAuthorization } = require("../middlewares/authorization");
const { ROLES } = require("../configs/ms-constants");

// aggrement route

router.get('/service1/aggrement',isAuthenticated, aggrementController.getAggrement);

router.get('/service1/aggrement/:aggrement_id',isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),aggrementController.getOneAggrement);

router.put('/service1/aggrement', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),aggrementController.updateAggrement);

router.post('/service1/aggrement', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),aggrementController.createAggrement);

router.delete('/service1/aggrement/:aggrement_id', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]), aggrementController.deleteAggrement);

module.exports = router;
