require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3001,
    mysqlSettings: {
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306
    },
    rabbitMqSettings: {
        consumerUri: process.env.CONSUMER_MQ_SERVER_URI || 'amqp://localhost',
        producerUri: process.env.PRODUCER_MQ_SERVER_URI || 'amqp://localhost',
    },
    cls: {
        // HTTP Correlation Header from ApiGateway
        correlationIdHeader: 'Microservices-Correlation-ID',
        // name of cls namespace
        correlationIdNamespace: 'cls-correlation-id',
        // name of the variable on the cls namespace
        correlationIdName: 'cls-correlation-id',
    },
    jwt: {
        publicKey: process.env.PUBLIC_KEY,
        algorithm: 'RS256',
    },
    mongoSettings: {
        db: process.env.DB_MONGO_NAME,
        user: process.env.DB_MONGO_USERNAME,
        password: process.env.DB_MONGO_PASSWORD,
        server: process.env.DB_MONGO_HOSTNAME || '127.0.0.1:27017',
    },
    ws: {
        port: 2021,

    },
    email: {
        user: process.env.EMAIL_USER_AUTH || 'gaconbibenh@gmail.com',
        password: process.env.EMAIL_PASSWORD_AUTH  || 'hwnzibrilvmsynzp',
        service: process.env.EMAIL_SERVICE || 'gmail',
    },
    general: {
        // Number of minutes after which a reset password token is considered invalid
        resetTokenExpiration: 1 * 60 * 24,
        // Number of minutes after which a reset password token is considered invalid
        verificationTokenExpiration: 1 * 60 * 24,
    },
    vnp: {
        vnp_TmnCode: process.env.VNP_CODE,
        vnp_HashSecret: process.env.VNP_SECRET,
        vnp_Url: process.env.VNP_URL,
        vnp_ReturnUrl: process.env.VNP_RETURN || "http://localhost:3001/project/order/vnpay_return"
    }
}
