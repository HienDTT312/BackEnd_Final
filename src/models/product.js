const { IDEA_STATUS } = require('../configs/ms-constants');

module.exports = (sequelize, type) => sequelize.define('products', {
    product_id: {
      type: type.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false,
    },
    user_id: {
      type: type.INTEGER, allowNull: false,
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
      type: type.STRING(20), allowNull: false, defaultValue: IDEA_STATUS.FIRST_CLOSURE,
    },
    created_date: { type: type.DATE, allowNull: true, defaultValue: new Date()   },
    updated_date: { type: type.DATE, allowNull: true,  },
}, {
  timestamps: false,
});
