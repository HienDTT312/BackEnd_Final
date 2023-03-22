module.exports = (sequelize, type) => sequelize.define('product_comments', {
	comment_id: {
		type: type.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false,
	},
	user_id: {
		type: type.INTEGER, allowNull: false,
	},
	comment: {
		type: type.TEXT, allowNull: true,
	},
	product_id: {
		type: type.INTEGER, allowNull: true,
	},
	anonymous: {
		type: type.BOOLEAN, allowNull: false, defaultValue:  false,
	},
	created_date: { type: type.DATE, allowNull: true, defaultValue: new Date()   },
  updated_date: { type: type.DATE, allowNull: true,  },
}, {
	timestamps: false,
});
