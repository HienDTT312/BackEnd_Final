const config = require('./configs/config');
const logger = require('./services/loggerService');
const app = require('./app');

const server = app.listen(config.port, () => logger.info(`Listening on port ${config.port}...`));
module.exports = server;
