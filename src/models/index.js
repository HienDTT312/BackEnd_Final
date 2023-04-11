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
const importModel = require('./import');

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

User.hasMany(Category, { as: 'categories', foreignKey: 'staff_id', sourceKey: 'user_id'});


Product.belongsTo(Category, {foreignKey: 'category_id'}); // Adds fk_company to User
Product.belongsTo(User, {foreignKey: 'user_id'}); // Adds fk_company to User
View.belongsTo(Product, {foreignKey: 'product_id'});

ProductComment.belongsTo(User, {foreignKey: 'user_id'}); // Adds fk_company to User

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
}
