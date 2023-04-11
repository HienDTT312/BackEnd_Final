module.exports = (sequelize, type) => sequelize.define('promotions', {
  promotion_id: {
    type: type.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false,
  },
  title: {
    type: type.TEXT, allowNull: true,
  },
  discount: {
    type: type.TEXT, allowNull: false,
  },
  description: {
    type: type.TEXT, allowNull: false,
  },
  category_id: {
    type: type.INTEGER, allowNull: true,
  },
  product_id: {
    type: type.INTEGER, allowNull: true,
  },
  supplier_id: {
    type: type.INTEGER, allowNull: true,
  },
  created_date: { type: type.DATE, allowNull: true, defaultValue: new Date()   },
  updated_date: { type: type.DATE, allowNull: true,  },
}, {
  timestamps: false,
  // hooks: {
  //   beforeBulkCreate: beforeBulkCreateHandler,
  //   beforeBulkUpdate: beforeBulkOtherHookHandler,
  //   beforeBulkDestroy: beforeBulkOtherHookHandler,
  //   afterCreate: afterHookHandler(HOOK_TYPE.CREATE),
  //   afterDestroy: afterHookHandler(HOOK_TYPE.DESTROY),
  //   afterUpdate: afterHookHandler(HOOK_TYPE.UPDATE),
  // },
});
