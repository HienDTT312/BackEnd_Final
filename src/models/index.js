const Sequelize = require('sequelize');
const sequelize = require('../boostraps/mysqlConnection');
const userModel = require('./users');
const customerModel = require('./customer');

const roleModel = require('./roles');
const categoryModel = require('./category');
const productModel = require('./product');
const brandModel = require('./brand');
const supplierModel = require('./supplier');
const productCommentModel = require('./product_comments');
const productDocumentModel = require('./product_documents');
const productVoteModel = require('./product_votes');
const aggrementModel = require('./aggrement');
const viewModel = require('./user_view');
const cartModel = require('./cart');
const promotionModel = require('./promotion');
const orderModel = require('./order');
const detailModel = require('./detail');
const supportModel = require('./support');
const importModel = require('./import');
const watchModel = require('./product_watch');
const favoriteModel = require('./product_favorite');

const Role = roleModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);
const Customer = customerModel(sequelize, Sequelize);

const Category = categoryModel(sequelize, Sequelize);
const Product = productModel(sequelize, Sequelize);
const ProductComment = productCommentModel(sequelize, Sequelize);
const ProductVote = productVoteModel(sequelize, Sequelize);
const ProductDocument = productDocumentModel(sequelize, Sequelize);
const Aggrement = aggrementModel(sequelize, Sequelize);
const View = viewModel(sequelize,Sequelize);
const Brand = brandModel(sequelize, Sequelize);
const Supplier = supplierModel(sequelize, Sequelize);
const Cart = cartModel(sequelize, Sequelize);
const Promotion = promotionModel(sequelize, Sequelize);
const Detail = detailModel(sequelize, Sequelize);
const Order = orderModel(sequelize, Sequelize);
const Import = importModel(sequelize, Sequelize);
const Watch = watchModel(sequelize, Sequelize);
const Support = supportModel(sequelize, Sequelize);
const Favorite = favoriteModel(sequelize, Sequelize);

User.hasMany(Category, { as: 'categories', foreignKey: 'staff_id', sourceKey: 'user_id'});
Product.belongsTo(User, {foreignKey: 'user_id'}); // Adds fk_company to User
Product.belongsTo(Category, {foreignKey: 'category_id'}); // Adds fk_company to User
View.belongsTo(Product, {foreignKey: 'product_id'});
// Customer.hasMany(ProductComment, { as: 'product_comments', foreignKey: 'user_id', sourceKey: 'user_id'});
Cart.belongsTo(Product, { foreignKey: 'product_id'})
Favorite.belongsTo(Product, { foreignKey: 'product_id'})
Detail.belongsTo(Product, { foreignKey: 'product_id'})

Watch.belongsTo(Product, { foreignKey: 'product_id'})

// Product.belongsTo(ProductDocument, { foreignKey: 'product_id'});

ProductComment.belongsTo(Customer, {foreignKey: 'user_id'}); // Adds fk_company to User
Role.hasMany(User, { as: 'users', foreignKey: 'role_id', sourceKey: 'role_id' });
Product.hasMany(ProductComment, { as: 'comments',  foreignKey: 'product_id', sourceKey: 'product_id'});
Product.hasMany(ProductVote, { as: 'votes',  foreignKey: 'product_id', sourceKey: 'product_id'});
Product.hasMany(ProductDocument, { as: 'documents',  foreignKey: 'product_id', sourceKey: 'product_id'});

module.exports = {
  Role,
  User,
  Category,
  Product,
  ProductComment,
  ProductDocument,
  ProductVote,
  Aggrement,
  View,
  Brand,
  Supplier,
  Promotion,
  Cart,
  Order,
  Import,
  Detail,
  Customer,
  Support,
  Watch,
  Favorite,
}
