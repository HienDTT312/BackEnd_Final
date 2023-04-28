module.exports = (sequelize, type) => sequelize.define('product_watches', {
	watch_id: {
		type: type.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false,
	},
	user_id: {
		type: type.INTEGER, allowNull: false,
	},
	product_id: {
		type: type.INTEGER, allowNull: false,
	},
	created_date: {
		type: type.DATE, allowNull: true, defaultValue: new Date()
	},
}, {
	timestamps: false,
});
