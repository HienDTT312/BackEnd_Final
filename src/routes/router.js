const express = require("express");

const router = express.Router();

// user routes

router.use(require('./accountRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./productRoutes'));
router.use(require('./aggrementRoutes'));
router.use(require('./authRoutes'));


module.exports = router;
