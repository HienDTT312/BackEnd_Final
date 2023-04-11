module.exports = (sequelize, type) => sequelize.define('details', {
  detail_id: {
    type: type.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false,
  },
  amount: {
    type: type.INTEGER, allowNull: false,
  },
  product_id: {
    type: type.INTEGER, allowNull: true,
  },
  order_id: {
    type: type.INTEGER, allowNull: true,
  },
  promotion_id: {
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
