const express = require("express");

const router = express.Router();
const promotionController = require('../controllers/promotionController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');
const { isAuthorization } = require("../middlewares/authorization");
const { ROLES } = require("../configs/ms-constants");
const { uploadDocument } = require("../services/uploadFileService");

// promotion route

router.get('/project/promotion',isAuthenticated, promotionController.getPromotion);

router.get('/project/promotion/:promotion_id',isAuthenticated,promotionController.getOnePromotion);

router.put('/project/promotion/:promotion_id',uploadDocument.array('documents', 6), isAuthenticated,promotionController.updatePromotion);

router.post('/project/promotion', isAuthenticated,uploadDocument.array('documents', 6), promotionController.createPromotion);

router.delete('/project/promotion/:promotion_id', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]), promotionController.deletePromotion);

module.exports = router;
