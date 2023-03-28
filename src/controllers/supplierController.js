const logger = require('../services/loggerService');
const { User, Role, Supplier } = require('../models');
const response = require('../services/responseService');
const customMessages = require('../configs/customMessages');

exports.getSupplier = async (req, res) => {
  try {
    const result = await Supplier.findAll();
    if (result) {
      logger.info('Supplier list', {supplier: result});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.supplierNotFound]);
  } catch (err) {
    logger.error('Cannot get supplier list', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createSupplier = async (req, res) => {
  try {
    const data = req.body;
    const supplier = await Supplier.create(data);
    if (supplier) {
      logger.info('Supplier created success', { supplier });
      return response.respondOk(res, supplier);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Categogy create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneSupplier = async (req, res, next) => {
  try {
    const supplier_id = req.params.supplier_id;
    const supplier = await Supplier.findOne({
      where: {
        supplier_id,
      }
    });
    if (supplier) {
      logger.info('Supplier found', { supplier });
      return response.respondOk(res, supplier);
    };
    return response.respondInternalServerError(res, [customMessages.errors.supplierNotFound]);
  } catch (err) {
    logger.error('Failed to get supplier', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateSupplier = async (req, res) => {
  try {
    const data = req.body;
    const supplier = await Supplier.findOne({
      where: {
        supplier_id: data.supplier_id
      },
    });

    if (!supplier) {
      logger.info('Supplier found');
      return response.respondInternalServerError(res, [customMessages.errors.supplierNotFound]);
    }

     // console.log('Test')
    data.updated_date = new Date();
    const updateSupplier = await Supplier.update(data, {
      where: {
        supplier_id: data.supplier_id,
      }
    });

    logger.info('Supplier found', { updateSupplier });
    return response.respondOk(res, updateSupplier);
  } catch (err) {
    logger.error('Failed to update supplier', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.deleteSupplier = async (req, res) => {
  try {
    const supplier_id = req.params.supplier_id;
    const result = await Supplier.destroy({ where: {
      supplier_id,
    } });

    if (result) {
      logger.info('Supplier deleted', { result });
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Supplier delete failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}
