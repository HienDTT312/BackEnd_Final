const logger = require('../services/loggerService');
const { User, Role, Product, ProductDocument,ProductComment, ProductVote, Category, View } = require('../models');
const { Op, where } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const response = require('../services/responseService');
const customMessages = require('../configs/customMessages');
const { generatePassword } = require('../services/generatePassword');
const emailService = require('../services/emailService.js');
const { email } = require('../configs/config');
const { EMAIL_SLUGS } = require('../configs/emailSlugs');
const config = require('../configs/config');
const fs = require('fs');
const path = require('path');
const {ROLES } = require('../configs/ms-constants');
const { Parser } = require('json2csv');
const JSZip = require('jszip');

exports.createProduct = async (req, res) => {
  try {
		const data = req.body;
    const payload = {
      user_id: req.user.user_id,
      category_id: data.category_id,
      description: data.description,
      status: data.status,
      title: data.title
    }

    const product = await Product.create(payload);
    if (product) {
      logger.info('Productd added successfully', {product});

      const sendEmail = await emailService.sendEmail({
        email_slug: EMAIL_SLUGS.IDEA_CREATED,
        id: product.product_id,
        created_date: product.created_date,
        full_name: req.user.full_name,
        title: product.title,
        description: product.description,
        username: manager.username,
      })

      const reqFiles = [];
      for (let i = 0; i < req.files.length; i++) {
        const ext = path.extname(req.files[i].filename);
        reqFiles.push({ document: req.files[i].filename, product_id: product.product_id, file_type: ext.substring(1)});
      }
      const documents = await ProductDocument.bulkCreate(reqFiles);
      if (documents.length < 0 || documents.length == 0) {
        return response.respondInternalServerError(res, [customMessages.errors.documentNotFound]);
      }

      logger.info('Documents added successfully', { documents });
      return response.respondOk(res, product);
    }
    return response.respondInternalServerError(res, [customMessages.errors.failedToCreateProduct]);
  } catch (err) {
    logger.error('Failed to add product', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getProduct = async (req, res) => {
  try {
    const where = {};

    if (req.query.user_id) {
      where.user_id = req.query.user_id;
    }

    if (req.query.product_id) {
      where.product_id = req.query.product_id;
    }

    if (req.query.category_id) {
      where.category_id = req.query.category_id;
    }

    const products = await Product.findAll({
        where,
        include: [
          {
            model: Category, as: 'category', attributes: ['category_name']
          },
          {
            model: User, as: 'user', attributes: ['full_name']
          },
        ]
      },
    );

    if (!products) {
      return response.respondInternalServerError(res, [customMessages.errors.productNotFound]);
    }
    const finalResult = [];

    for (let i = 0; i < products.length; i++) {
      const countLike = await ProductVote.count({
        where: {
          vote: 1,
          product_id: products[i].product_id,
        }
      });

      const countDislike = await ProductVote.count({
        where: {
          vote: 0,
          product_id: products[i].product_id,
        }
      });

      finalResult.push({
        product_id: products[i].product_id,
        category_name: products[i].category.category_name,
        full_name: products[i].user.full_name,
        title: products[i].title,
        description: products[i].description,
        status: products[i].status,
        count_like: countLike,
        count_dislike: countDislike,
        created_date: products[i].created_date,
        updated_date: products[i].updated_date,
      });
    }

    return response.respondOk(res, finalResult);
  } catch (err) {
    logger.error('Failed to get product list', err)
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.exportProduct = async (req, res) => {
  try {
    const where = {};

    if (req.query.user_id) {
      where.user_id = req.query.user_id;
    }
    if (req.query.product_id) {
      where.product_id = req.query.product_id;
    }

    const products = await Product.findAll({
        where,
        include: [
          {
            model: Category, as: 'category', attributes: ['category_name']
          },
          {
            model: User, as: 'user', attributes: ['full_name']
          },
        ]
      },
    );

    if (!products) {
      return response.respondInternalServerError(res, [customMessages.errors.productNotFound]);
    }
    const finalResult = [];

    for (let i = 0; i < products.length; i++) {
      // const count = await ProductVote.findAll({
      //   attributes: [
      //     'vote',
      //     [sequelize.fn('COUNT', sequelize.col('vote')), 'count']
      //   ],
      //   group: 'vote',
      //   raw: true,
      //   where: {
      //     product_id: products[i].product_id,
      //   }
      // })
      const countLike = await ProductVote.count({
        where: {
          vote: 1,
          product_id: products[i].product_id,
        }
      });

      const countDislike = await ProductVote.count({
        where: {
          vote: 0,
          product_id: products[i].product_id,
        }
      });

      finalResult.push({
        product_id: products[i].product_id,
        category_name: products[i].category.category_name,
        full_name: products[i].user.full_name,
        title: products[i].title,
        description: products[i].description,
        status: products[i].status,
        count_like: countLike,
        count_dislike: countDislike,
        created_date: products[i].created_date,
        updated_date: products[i].updated_date,
      });
    }

    const fields = ['product_id','full_name', 'title','description', 'status', 'count_like', 'count_dislike', 'category_name', 'created_date', 'updated_date'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(finalResult);
    const DIR = './public/csv'
    const fileurl = path.join(DIR, + new Date() + 'staff.csv');
    const filename = new Date() + 'staff.csv';
    fs.writeFileSync(fileurl,"\uFEFF" + csv, 'utf-8');

    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')
    res.status(200).download(fileurl, filename);
  } catch (err) {
    logger.error('Failed to get product list', err)
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneProduct = async (req, res) => {
  try {
    const productId = req.params.product_id;
    const userId = req.user.user_id;

    const view = await View.findOne({
      where: {
        user_id: userId,
        product_id: productId,
      }
    });

    if (!view) {
      const newView = await View.create({
        user_id: userId,
        product_id: productId
      });

      logger.info('User view added', { newView });
    }

    const product = await Product.findOne({
        where: {
          product_id: productId,
        },
        include: [{
          model: ProductDocument, as: 'documents',
          },
          {
            model: ProductComment, as:'comments', include: [{
              model: User, attributes: ['full_name', 'avatar']
            }],
          },
          {
            model: User, as: 'user', attributes: ['full_name','avatar']
          },
          {
            model: Category, as: 'category', attributes: ['category_name'],
          },

        ]
      },
    );

    if (!product) {
      return response.respondInternalServerError(res, [customMessages.errors.productNotFound]);
    }

    const finalResult = {
      product_id: product.product_id,
      user_id: product.user_id,
      full_name: product.user.full_name,
      avatar: product.user.avatar,
      title: product.title,
      status: product.status,
      description: product.description,
      category_name: product.category.category_name,
      category_id: product.category_id,
      documents: product.documents,
    }

    const comments = product.comments.map( comment => {
      return {
        full_name: comment.user.full_name,
        avatar: comment.user.avatar,
        comment: comment.comment,
        created_date: comment.created_date,
        updated_date: comment.updated_date,
      }
    });

    const count = await ProductVote.findAll({
      attributes: [
        'vote',
        [sequelize.fn('COUNT', sequelize.col('vote')), 'count']
      ],
      group: 'vote',
      raw: true,
      where: {
        product_id: productId,
      }
    })

    const views = await View.count({
      where: {
        product_id: productId,
      }
    })

    finalResult.count = count;
    finalResult.comments = comments;
    finalResult.views = views;

    logger.info('Product found', { finalResult });
    return response.respondOk(res, finalResult);
  } catch (err) {
    logger.error('Failed to product', err)
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.product_id;
    const data = req.body;

    const updatePayload = {
      description: data.description,
      title: data.title,
      category_id: data.category_id,
      status: data.status,
    }

    const updatedProduct = await Product.update(updatePayload, {
      where: {
        product_id: productId,
      }
    });

    if (updatedProduct) {
      logger.info('Product updated success', updatedProduct);

      const reqFiles = [];
      for (let i = 0; i < req.files.length; i++) {
        const ext = path.extname(req.files[i].filename);
        reqFiles.push({ document: req.files[i].filename, product_id: productId, file_type: ext.substring(1)});
      }
      const documents = await ProductDocument.bulkCreate(reqFiles);
      logger.info('Documents added successfully', { documents });
      return response.respondOk(res, updatedProduct);
    }
    return response.respondInternalServerError(res, [customMessages.errors.productNotFound]);
  } catch (err) {
    logger.info('Failed to update product', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.product_id;
    const result = await Product.destroy({ where: {
      product_id: productId,
    } });

    if (result) {
      logger.info('Product deleted success', { result });
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.productNotFound]);
  } catch (err) {
    logger.error('Failed to delete product', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createComment = async (req, res) => {
  try {
    const data = req.body;

    const payload = {
      user_id: req.user.user_id,
      comment: data.comment,
      product_id: data.product_id,
    }
    if (data.anonymous) payload.anonymous = data.anonymous;

    const comment = await ProductComment.create(payload);

    if (comment) {
      logger.info('Commented', { comment });
      const product = await Product.findOne({
        where: {
          product_id: data.product_id,
        },
        attributes: ['user_id'],
      });

      if (!product) {
        return response.respondInternalServerError(res, [customMessages.errors.productNotFound]);
      }

      const author = await User.findOne({
        where: {
          user_id: product.user_id,
        },
        attributes: ['username'],
      });

      if (!author) {
        return response.respondInternalServerError(res, [customMessages.errors.userNotFound]);
      }
      await emailService.sendEmail({
        email_slug: EMAIL_SLUGS.IDEA_COMMENT,
        full_name: req.user.full_name,
        avatar: req.user.avatar,
        created_date: comment.created_date,
        id: data.product_id,
        comment: comment.comment,
        username: author.username,
      })

      return response.respondOk(res, comment);
    }
    return response.respondInternalServerError(res, [customMessages.errors.commentNotFound])
  } catch (err) {
    logger.info('Failed to comment', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneComment = async (req, res) => {
  try {
    const productId = req.params.product_id;
    const userId = req.user.user_id;
    const comments = await ProductComment.findAll({
      where: {
        product_id: productId,
      },
      include: [
        {
          model: User, attributes: ['full_name', 'avatar', 'gender']
        }
      ]
    });

    if (comments) {
      comments.forEach( comment => {
        if (comment.anonymous && comment.user_id !== userId) {
          comment.user.full_name = 'anonymous';
          if (comment.user.gender === 'female') {
            comment.user.avatar = 'img/female.jpg'
          } else {
            comment.user.avatar = 'img/male.jpg'
          }
        }
      })
      logger.info('Comment found', { comments });
      return response.respondOk(res, comments);
    }
    return response.respondInternalServerError(res, [customMessages.errors.commentNotFound]);
  } catch (err) {
    logger.info('Failed to get comment', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getComment = async (req, res) => {
  try {
    const productId = req.params.product_id;
    const comment = await ProductComment.findAll({});

    if (comment) {
      logger.info('Comment found', { comment });
      return response.respondOk(res, comment);
    }
    return response.respondInternalServerError(res, [customMessages.errors.commentNotFound]);
  } catch (err) {
    logger.info('Failed to get comment', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateComment = async (req, res) => {
  try {
    const commentId = req.params.comment_id;
    const data = req.body;

    const updatePayload = {
      comment: data.comment,
      updated_date: new Date(),
    }

    if (data.anonymous) updatePayload.anonymous = data.anonymous;
    const comment = await ProductComment.update(updatePayload, {
      where: {
        comment_id: commentId,
      },
    });

    if (comment) {
      logger.info('Comment updated', { comment });
      return response.respondOk(res, comment);
    }
    return response.respondInternalServerError(res, [customMessages.errors.commentNotFound]);
  } catch (err) {
    logger.info('Failed to updated comment', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.comment_id;
    const userId = req.user.user_id;
    const userRole = req.user.role_id;

    const comment = await ProductComment.findOne({
      where: {
        comment_id: commentId,
      },
    });

    if (!comment) {
      return response.respondInternalServerError(res, [customMessages.errors.commentNotFound]);
    }

    if (comment.user_id === userId || userRole === ROLES.ADMIN) {
      const result = await ProductComment.destroy({
        where: {
          comment_id: commentId,
        }
      });

      if (result) {
        logger.info('Comment deleted', { result });
        return response.respondOk(res, result);
      }
      return response.respondInternalServerError(res, [customMessages.errors.internalError])
    }
    logger.error('Cannot delete comment');
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Faled to delete comment', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.vote = async (req, res) => {
  try {
    const data = req.body;
    const payload = {
      user_id: req.user.user_id,
      vote: data.vote,
      product_id: data.product_id,
    }
    const checkVoteExisted = await ProductVote.findOne({
      where: {
        user_id: payload.user_id,
        product_id: payload.product_id,
      },
      raw: true,
    });

    if (checkVoteExisted) {
      if (checkVoteExisted.vote === payload.vote) {
        const result = await ProductVote.destroy({
          where: {
            vote_id: checkVoteExisted.vote_id,
          }
        })
        if (result) {
          logger.info('Unvoted', result);
          return response.respondOk(res, result);
        }
      }
      const updatedVote = await ProductVote.update({
        vote: payload.vote,
        updated_date: new Date(),
      }, {
        where: {
          vote_id: checkVoteExisted.vote_id,
        },
      })

      if (updatedVote) {
        logger.info('Voted', { updatedVote });
        return response.respondOk(res, updatedVote);
      }
    }

    const vote = await ProductVote.create(payload);
    if (vote) {
      logger.info('Voted', { vote });
      return response.respondOk(res, vote);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Failed to vote', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.deleteDocument = async (req,res) => {
  try {
    const documentId = req.params.document_id;

    const result = await ProductDocument.destroy({
      where: {
        document_id: documentId,
      }
    })

    if (result) {
      logger.info('Delete document successfully', { result });
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.cannotDeleteDocument]);
  } catch (err) {
    logger.info('Failed to delete document', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getCount = async (req, res) => {
  const productCount = await Product.count({
  });
  const userCount = await User.count({

  });

  const finalResult = {
    user: userCount,
    product: productCount,

  }

  return response.respondOk(res, finalResult)
}

exports.getCountAdmin = async (req, res) => {


  const productCount = await Product.count({
  });
  const userCount = await User.count({
  });

  const finalResult = {
    user: userCount,
    product: productCount,
  }

  return response.respondOk(res,finalResult);
}

exports.download = async (req, res) => {
  const documentId = req.params.document_id;
  const zip = new JSZip();

  const document = await ProductDocument.findOne({
    where: {
      document_id: documentId,
    }
  });



  if (!document) {
    return res.respondInternalServerError(res, [customMessages.errors.documentNotFound]);
  }
  const fileurl = path.join(__dirname, '../../public/documents', document.document)
  const filename = document.document;
  const file = fs.readFileSync(fileurl);

  console.log(file);

  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')
  res.status(200).download(fileurl, filename);
}

exports.downloadAll = async (req, res) => {
  const productId = req.params.product_id;
  const zip = new JSZip();

  const product = await Product.findOne({
    where: {
      product_id: productId,
    }
  });

  if (!product) {
    return res.respondInternalServerError(res, [customMessages.errors.productNotFound]);
  }

  const productDocument = await ProductDocument.findAll({
    where: {
      product_id: productId,
    }
  })

  for (let i = 0; i < productDocument.length; i++) {
    const fileurl = path.join(__dirname, '../../public/documents', productDocument[i].document)
    const file = fs.readFileSync(fileurl);
    const filename = productDocument[i].document;
    zip.file(filename, file, {base64: true});
  }

  zip.generateAsync({type:"nodebuffer"})

  const content = await zip.generateAsync({type: 'nodebuffer'});

  console.log(content)
  fs.writeFileSync("document.zip", content);
  const DIR = './public/csv'
  const url = path.join(DIR, 'document.zip');
  // const name = new Date() + 'staff.csv';
  fs.writeFileSync(url, content);

  res.download(url, 'document.zip', function(err) {
    if (err) {
      console.log(err)
    }
    fs.unlinkSync(url)
  });
}
