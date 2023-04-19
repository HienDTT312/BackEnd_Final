const express = require("express");

const router = express.Router();

// user routes

router.use(require('./accountRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./productRoutes'));
router.use(require('./aggrementRoutes'));
router.use(require('./authRoutes'));
router.use(require('./brandRoutes'));
router.use(require('./supplierRoutes'));
router.use(require('./customerRoutes'));
router.use(require('./promotionRoutes'));
router.use(require('./cartRoutes'));
router.use(require('./importRoutes'));
router.use(require('./orderRoutes'));
router.use(require('./supportRoutes'));

module.exports = router;
