const express = require("express");

const router = express.Router();
const importController = require('../controllers/importController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');
const { isAuthorization } = require("../middlewares/authorization");
const { ROLES } = require("../configs/ms-constants");
const { uploadDocument } = require("../services/uploadFileService");

// import route

router.get('/project/import',isAuthenticated, importController.getImport);

router.get('/project/import/:import_id',isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),importController.getOneImport);

router.put('/project/import', isAuthenticated,  uploadDocument.array('documents', 6),isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),importController.updateImport);

router.post('/project/import', isAuthenticated, uploadDocument.array('documents', 6), isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]),importController.createImport);

router.delete('/project/import/:import_id', isAuthenticated, isAuthorization([ROLES.ADMIN, ROLES.QA_MANAGER]), importController.deleteImport);

module.exports = router;
