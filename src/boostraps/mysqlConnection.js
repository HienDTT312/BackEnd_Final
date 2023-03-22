const Sequelize = require('sequelize');
const logger = require('../services/loggerService');
const { mysqlSettings } = require('../configs/config')

const sequelize = new Sequelize(
    mysqlSettings.database,
    mysqlSettings.user,
    mysqlSettings.password,
     {
        host: mysqlSettings.host,
        port: mysqlSettings.port,
        pool: {
            acquire: 30000,
        },
        logging: false,
        retry: {
            match: [/Deadlock/i],
            max: 3,
            backoffBase: 1000,
            backoffExponent: 1.5,
        },
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    logger.info('Connected to MYSQL database', { host: mysqlSettings.database });
}).catch((err) => {
    logger.error('Unable to connect to the MYSQL database', { host: mysqlSettings.host, err });
});

module.exports = sequelize;