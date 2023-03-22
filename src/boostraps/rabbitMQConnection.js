const amqp = require('amqp-connection-manager');
const { rabbitMqSettings } = require('../configs/config');
const logger = require('../services/loggerService');

const rabbitConnect = (rabbitMqUri) => {
    const connection = amqp.connect(rabbitMqUri);
    let safeUri = rabbitMqUri.match(/[^@]*$/);
    safeUri = (safeUri[0] !== undefined) ? safeUri : '';

    connection.on('connect', () => {
        logger.info('Connected to rabbitMq', {server: rabbitMqUri});
    });

    connection.on('disconect', (params) => {
        logger.error('Disconnected from rabbitMq', {server: rabbitMqUri, error: params.err.stack });
    })

    return connection;
}

module.exports = {
    consumerConnection: rabbitConnect(rabbitMqSettings.consumerUri),
    producerConnection: rabbitConnect(rabbitMqSettings.producerUri)
}