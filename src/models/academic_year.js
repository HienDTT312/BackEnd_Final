module.exports = (sequelize, type) => sequelize.define('terms', {
    term_id: {
        type: type.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false,
      },
    term_name: {
      type: type.STRING(20), allowNull: false,
    },
    start_date: { type: type.DATE, allowNull: true,  },
    end_date: { type: type.DATE, allowNull: true,  },
    first_closure_date: { type: type.DATE, allowNull: true,  },
    final_closure_date: { type: type.DATE, allowNull: true,  },
    status: { type: type.STRING(20), allowNull: false },
    closure_status: {
      type: type.STRING(20), allowNull: true, defaultValue: 'none',
    },
},{
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
