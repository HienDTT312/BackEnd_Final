const express = require("express");

const router = express.Router();
const supportController = require('../controllers/supportController');
const { isAuthenticated } = require('../middlewares/authentication');
const { isAuthorization } = require("../middlewares/authorization");
const { ROLES } = require("../configs/ms-constants");

// support route

router.get('/project/support', supportController.getSupport);

router.get('/project/support/:support_id',supportController.getOneSupport);

router.put('/project/support', supportController.updateSupport);

router.post('/project/support', supportController.createSupport);

router.delete('/project/support/:support_id', supportController.deleteSupport);

module.exports = router;
