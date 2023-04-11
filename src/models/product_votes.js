module.exports = (sequelize, type) => sequelize.define('product_votes', {
	vote_id: {
		type: type.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false,
	},
	user_id: {
		type: type.INTEGER, allowNull: false,
	},
	vote: {
		type: type.TEXT, allowNull: true,
	},
	product_id: {
		type: type.INTEGER, allowNull: true,
	},
}, {
	timestamps: false,
});
