const { IDEA_STATUS } = require('../configs/ms-constants');

module.exports = (sequelize, type) => sequelize.define('products', {
    product_id: {
      type: type.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false,
    },
    brand_id: {
      type: type.INTEGER, allowNull: true,
    },
    title: {
      type: type.STRING(100), allowNull: false,
    },
    description: {
      type: type.TEXT, allowNull: true,
    },
    category_id: {
      type: type.INTEGER, allowNull: true,
    },
    status: {
      type: type.BOOLEAN, allowNull: true,
    },
    brand_name: {
      type: type.TEXT, allowNull: true,
    },
    supplier_name: {
      type: type.TEXT, allowNull: true,
    },
    author: {
      type: type.TEXT, allowNull: true,
    },
    supplier_id: {
      type: type.INTEGER, allowNull: true,
    },
    amount: {
      type: type.INTEGER, allowNull: true, defaultValue: 0,
    },
    price: {
      type: type.INTEGER, allowNull: true,
    },
    promotion: {
      type: type.INTEGER, allowNull: true,
    },
    sold: {
      type: type.INTEGER, allowNull: true,
    },
    created_date: { type: type.DATE, allowNull: true, defaultValue: new Date()   },
    updated_date: { type: type.DATE, allowNull: true,  },
}, {
  timestamps: false,
});
