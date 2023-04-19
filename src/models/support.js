module.exports = (sequelize, type) => sequelize.define('supports', {
  support_id: {
    type: type.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false,
  },
  name: {
    type: type.TEXT, allowNull: true
  },
  phone: {
    type: type.TEXT, allowNull: true
  },
  email: {
    type: type.TEXT, allowNull: true
  },
  description: {
    type: type.TEXT, allowNull: true
  },
  status: {
    type: type.TEXT, allowNull: true, defaultvalue: 'received'
  },
  reason: {
    type: type.TEXT, allowNull: true,
  },
  created_date: { type: type.DATE, allowNull: true, defaultValue: new Date() },
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
