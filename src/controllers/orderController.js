const logger = require('../services/loggerService');
const { User, Role, Order, Detail, Cart, Product } = require('../models');
const response = require('../services/responseService');
const customMessages = require('../configs/customMessages');
const config = require('../configs/config');
const dateFormat = require('dateformat');

exports.getOrder = async (req, res) => {
  try {
    const userId = req.user.user_id
    const result = await Order.findAll({
      where: {
        user_id: userId,
      }
    });
    if (result) {
      logger.info('Order list', {order: result});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.orderNotFound]);
  } catch (err) {
    logger.error('Cannot get order list', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createOrder = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const order = await Order.create({
      user_id: user_id,
    });
    if (order) {
      logger.info('Order created success', { order });

      const cart = await Cart.findAll({
        where: {
          user_id: user_id,
        }, raw: true,
      });
      console.log('34')

      for (let i = 0; i < cart.length; i++) {
        await Detail.create({
          order_id: order.order_id,
          product_id: cart[i].product_id,
          amount: cart[i].amount,
        });


      };

      await Cart.destroy({
          where: {
            user_id,
          }
        })
      return response.respondOk(res, order);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Categogy create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneOrder = async (req, res, next) => {
  try {
    const order_id = req.params.order_id;
    const order = await Order.findOne({
      where: {
        order_id,
      }
    });
    if (order) {
      logger.info('Order found', { order });
      return response.respondOk(res, order);
    };
    return response.respondInternalServerError(res, [customMessages.errors.orderNotFound]);
  } catch (err) {
    logger.error('Failed to get order', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneOrderDetail = async (req, res, next) => {
  try {
    const order_id = req.params.order_id;
    const order = await Detail.findAll({
      where: {
        order_id,
      },
      include: [
        {
          model: Product, as: 'product', attributes: ['title', 'amount', 'price'],
          }],
          // raw: true,

    });
    const finalResult = [];
    if (order) {
      logger.info('Detail found', { order });

      for (let i = 0; i < order.length; i++) {
        finalResult.push({
          amount: order[i].amount,
          title: order[i].product.title,
          price: order[i].product.price,
        })
      }

      return response.respondOk(res, finalResult);
    };
    return response.respondInternalServerError(res, [customMessages.errors.orderNotFound]);
  } catch (err) {
    logger.error('Failed to get order', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateOrder = async (req, res) => {
  try {
    const data = req.body;
    const order = await Order.findOne({
      where: {
        order_id: data.order_id
      },
    });

    if (!order) {
      logger.info('Order found');
      return response.respondInternalServerError(res, [customMessages.errors.orderNotFound]);
    }

     // console.log('Test')
    data.updated_date = new Date();
    const updateOrder = await Order.update(data, {
      where: {
        order_id: data.order_id,
      }
    });

    logger.info('Order found', { updateOrder });
    return response.respondOk(res, updateOrder);
  } catch (err) {
    logger.error('Failed to update order', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.deleteOrder = async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const result = await Order.destroy({ where: {
      order_id,
    } });

    if (result) {
      logger.info('Order deleted', { result });
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Order delete failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}


exports.getCart = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const result = await Cart.findAll({
      where: {
        user_id: userId,
      }
    });
    if (result) {
      logger.info('Cart list', {order: result});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.orderNotFound]);
  } catch (err) {
    logger.error('Cannot get Cart list', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createCart = async (req, res) => {
  try {
    const data = req.body;
    const order = await Cart.create(data);
    if (order) {
      logger.info('Cart created success', { order });
      return response.respondOk(res, order);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Categogy create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}


exports.vnpay = async (req, res) => {
  var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;


    var tmnCode = config.vnp.vnp_TmnCode;
    var secretKey = config.vnp.vnp_HashSecret;
    var vnpUrl = config.vnp.vnp_Url;
    var returnUrl = config.vnp.vnp_ReturnUrl;

    var date = new Date();

    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var orderId = dateFormat(date, 'HHmmss');
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;

    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if(locale === null || locale === ''){
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    return response.respondOk(res, vnpUrl);
  };

exports.vnpayReturn = async (req, res, next) => {
  var vnp_Params = req.query;

  var secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  // var config = require('config');
  var tmnCode = config.vnp.vnp_TmnCode;
  var secretKey = config.vnp.vnp_HashSecret;

  var querystring = require('qs');
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

  if(secureHash === signed){
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      res.render('success', {code: vnp_Params['vnp_ResponseCode']})
  } else{
      res.render('success', {code: '97'})
  }
};

function sortObject(obj) {
	var sorted = {};
	var str = [];
	var key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
    console.log(obj)

		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
