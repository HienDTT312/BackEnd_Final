module.exports = (sequelize, type) => sequelize.define('brands', {
  brand_id: {
    type: type.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false,
  },
  brand_name: {
    type: type.TEXT, allowNull: false,
  },
  phone_number: {
    type: type.TEXT, allowNull: false,
  },
  brand_address: {
    type: type.TEXT, allowNull: false,
  },
  manager: {
    type: type.TEXT, allowNull: false,
  },
  status: {
    type: type.BOOLEAN, allowNull: false,
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
