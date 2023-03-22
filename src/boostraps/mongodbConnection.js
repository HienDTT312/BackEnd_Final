/**
 * MongoDB connection
 * @module bootstrap/mongodb
 */
 const mongoose = require('mongoose');
 const config = require('../configs/config');
 const logger = require('../services/loggerService');

 /**
  * Generate mongo connection string from DB settings object
  * @function
  * @param {Object} serviceDB - Object with DB settings
  * @returns {String} - Generated connection string
  */

const generateConnectionURI = (serviceDB) => `mongodb://${
//    serviceDB.user}:${
//    serviceDB.password}@${
   serviceDB.server}/${
   serviceDB.db}`;

 /**
  * DB connection options
  * @constant
  */
const dbConnectionOptions = {
//    useFindAndModify: false,
   useNewUrlParser: true,
//    useCreateIndex: true,
//    auto_reconnect: true,
//    reconnectTries: 100,
//    reconnectInterval: 1000,
   keepAlive: true,
   connectTimeoutMS: 30000,
   useUnifiedTopology: true,
//    authSource: 'admin'
   // ssl: true,
 };

 /**
  * Connect to DB with provided URI
  * @function
  * @param {Object} dbSettings - DD Settings
  */
 const dbConnect = (dbSettings) => {
   const connection = mongoose.connect(generateConnectionURI(dbSettings), dbConnectionOptions);
   const closeConnection = () => {
     mongoose.connection.close(() => {
       logger.warn(`MongoDB ${dbSettings.server} connection is disconnected due to application termination`);
       process.exit(0);
     });
   };
   mongoose.connection.on('error', (err) => {
     logger.error(`An error occurs on a connection ${dbSettings.server}`, err);
     // reconnect here
   });
   mongoose.connection.on('reconnected', () => {
     logger.info(`MongoDB ${dbSettings.server} is reconnected`);
   });
   mongoose.connection.on('close', () => {
     logger.warn(`MongoDB ${dbSettings.server} connection closed`);
   });
   mongoose.connection.on('connecting', () => {
     logger.info(`Connecting to MongoDB ${dbSettings.server}`);
   });
   mongoose.connection.on('connected', () => {
     logger.info(`Connected to MongoDB ${dbSettings.server}`);
   });
   mongoose.connection.on('disconnected', () => {
     logger.warn(`MongoDB ${dbSettings.server} connection is disconnected`);
   });
   mongoose.connection.on('disconnecting', () => {
     logger.warn(`MongoDB ${dbSettings.server} connection is disconnecting`);
   });
   // mongoose.set('debug', true);

   // If the Node process ends, close the Mongoose connection
   process.on('SIGINT', closeConnection).on('SIGTERM', closeConnection);
   process.on('uncaughtException', (err) => {
     logger.error('Caught exception: ', err);
   });
   return connection;
 };

 module.exports = () => { dbConnect(config.mongoSettings); };
