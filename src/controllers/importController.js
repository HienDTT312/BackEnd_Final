const logger = require('../services/loggerService');
const { User, Role, Import, Product } = require('../models');
const response = require('../services/responseService');
const customMessages = require('../configs/customMessages');

exports.getImport = async (req, res) => {
  try {
    const result = await Import.findAll();
    if (result) {
      logger.info('Import list', {importProduct: result});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.importProductNotFound]);
  } catch (err) {
    logger.error('Cannot get importProduct list', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createImport = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const importProduct = await Import.create(data);
    if (importProduct) {
      logger.info('Import created success', { importProduct });
      if (importProduct) {
        const product = await Product.findOne({
          where: {
            product_id: importProduct.product_id,
          }
        });
        if (product) {
          await Product.update({
            amount: parseInt(product.amount)
             + parseInt( data.amount)
            ,
          }, {
            where: {
              product_id: data.product_id,
            }
          });
        }
      }
      return response.respondOk(res, importProduct);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Import create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneImport = async (req, res, next) => {
  try {
    const import_id = req.params.import_id;
    const importProduct = await Import.findOne({
      where: {
        import_id,
      }
    });
    if (importProduct) {
      logger.info('Import found', { importProduct });
      return response.respondOk(res, importProduct);
    };
    return response.respondInternalServerError(res, [customMessages.errors.importProductNotFound]);
  } catch (err) {
    logger.error('Failed to get importProduct', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateImport = async (req, res) => {
  try {
    const data = req.body;
    const importProduct = await Import.findOne({
      where: {
        import_id: data.import_id
      },
    });

    if (!importProduct) {
      logger.info('Import found');
      return response.respondInternalServerError(res, [customMessages.errors.importProductNotFound]);
    }

     // console.log('Test')
    data.updated_date = new Date();
    const updateImport = await Import.update(data, {
      where: {
        import_id: data.import_id,
      }
    });

    logger.info('Import found', { updateImport });
    return response.respondOk(res, updateImport);
  } catch (err) {
    logger.error('Failed to update importProduct', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.deleteImport = async (req, res) => {
  try {
    const import_id = req.params.import_id;
    const result = await Import.destroy({ where: {
      import_id,
    } });

    if (result) {
      logger.info('Import deleted', { result });
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Import delete failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}
