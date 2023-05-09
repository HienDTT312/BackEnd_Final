const express = require("express");

const router = express.Router();
const projectController = require('../controllers/project');
const productController = require('../controllers/productController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');

const { uploadAvatar, uploadDocument } = require('../services/uploadFileService');


// Product route

router.get('/project/product', productController.getProduct);

router.get('/project/product/:product_id', productController.getOneProduct);

router.get('/project/product/:product_id', productController.getOneProduct);

router.get('/project/check/:product_id',isAuthenticated, productController.checkOneProduct);

router.post('/project/product', uploadDocument.array('documents', 6), productController.createProduct);

router.delete('/project/product/:product_id', productController.deleteProduct);

router.put('/project/product/:product_id', uploadDocument.array('documents', 6 ),productController.updateProduct);

router.get('/service/product/exports', productController.exportProduct);

// Comment route

router.post('/project/comment', isAuthenticated, productController.createComment);

router.put('/project/comment/:comment_id', productController.updateComment);

router.delete('/project/comment/:comment_id', isAuthenticated, productController.deleteComment);

router.get('/project/comment/:product_id', isAuthenticated, productController.getOneComment);

router.get('/project/comment', isAuthenticated, productController.getComment);

// document route

router.delete('/project/document/:document_id', isAuthenticated, productController.deleteDocument);

// Vote route

router.post('/project/vote', isAuthenticated, productController.vote);

router.post('/project/watch', isAuthenticated, productController.watch);

router.get('/project/watch', isAuthenticated, productController.getWatch);

router.get('/project/favorite', isAuthenticated, productController.getFavorite);

router.post('/project/favorite', isAuthenticated, productController.favorite);


// Export and download

router.get('/project/csv', productController.exportProduct);

// Statistic

router.get('/project/dashboard-admin', isAuthenticated,productController.getCountAdmin)

router.get('/project/dashboard', isAuthenticated,productController.getCount)

router.get('/project/download/:document_id', productController.download);

router.get('/project/download-all/:product_id', productController.downloadAll);


module.exports = router;
