const express = require("express");

const router = express.Router();
const service1Controller = require('../controllers/service1');
const productController = require('../controllers/productController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');

const { uploadAvatar, uploadDocument } = require('../services/uploadFileService');


// Product route

router.get('/service1/product',isAuthenticated, productController.getProduct);

router.get('/service1/product/:product_id',isAuthenticated, productController.getOneProduct);

router.post('/service1/product',isAuthenticated, uploadDocument.array('documents', 6), productController.createProduct);

router.delete('/service1/product/:product_id',isAuthenticated, productController.deleteProduct);

router.put('/service1/product/:product_id',isAuthenticated, uploadDocument.array('documents', 6 ),productController.updateProduct);

router.get('/service/product/exports',isAuthenticated, productController.exportProduct);

// Comment route

router.post('/service1/comment', isAuthenticated, productController.createComment);

router.put('/service1/comment/:comment_id', productController.updateComment);

router.delete('/service1/comment/:comment_id', isAuthenticated, productController.deleteComment);

router.get('/service1/comment/:product_id', isAuthenticated, productController.getOneComment);

router.get('/service1/comment', isAuthenticated, productController.getComment);

// document route

router.delete('/service1/document/:document_id', isAuthenticated, productController.deleteDocument);

// Vote route

router.post('/service1/vote', isAuthenticated, productController.vote);

// Export and download

router.get('/service1/csv', productController.exportProduct);

// Statistic

router.get('/service1/dashboard-admin', isAuthenticated,productController.getCountAdmin)

router.get('/service1/dashboard', isAuthenticated,productController.getCount)

router.get('/service1/download/:document_id', productController.download);

router.get('/service1/download-all/:product_id', productController.downloadAll);

module.exports = router;
