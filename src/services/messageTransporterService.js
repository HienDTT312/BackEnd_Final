const logger = require('../services/loggerService');

const getMessage = (messageData, queue, channel) => {
    try {
        const messageContent = JSON.parse(messageData.content.toString());
        // messageheader

        logger.info('Receive message', { queue: queue.name, content: messageContent});
        // validate

        return { message: messageContent };
    } catch (e) {
        logger.error('Message failed to process', { messageData });
        channel.nack(messageData, false, false);
        throw Error(e);
    }
}

const initializeConsumer = (queueName, callback, connection) => {
    const channelWrapper = connection.createChannel({
      json: true,
      setup: (channel) => Promise.all([
        channel.assertQueue(queueName, { durable: true }),
        channel.prefetch(1),
        channel.consume(queueName, callback),
      ]),
    });
    channelWrapper.waitForConnect()
      .then(() => {
        logger.info('Start listening for messages.', { queue: queueName });
      });
    return channelWrapper;
};

const acknowledgeMessage = (messageData, channel) => {
    try {
        channel.ack(messageData);
        console.log('Message acknowledge.');
    } catch (e) {
        console.log('Message acknowledge failed');
    }
}

const producerChannelWrapper = [];
const sendMessage = async (queue, message, headers = {}, connection) => {
  try {
    validateMessage(queue, message);
    let channelWrapperFind = producerChannelWrapper.find((channelWrapper) => channelWrapper.queueName === queue);
    if (producerChannelWrapper.length === 0 || channelWrapperFind === undefined) {
      const channelSet = {
        queueName: queue,
        channel: connection.createChannel({
          json: true,
          setup: (channel) => channel.assertQueue(queue.name, { durable: true }),
        }),
      };
      producerChannelWrapper.push(channelSet);
      channelWrapperFind = channelSet;
    }
    // const messageHeaders = setMessageHeaders(headers);
    await channelWrapperFind.channel.sendToQueue(queue.name, message, { headers: messageHeaders });
    logger.info('Message sent.', { queue: queue.name, content: message, headers });
  } catch (e) {
    const errForLogs = e.toString() ? e.toString() : e;
    logger.error('Message sent failed. ', { queue: queue.name, error: errForLogs, queueMessage: message });
  }
};

module.exports = {
    getMessage,
    initializeConsumer,
    sendMessage,
    acknowledgeMessage,
  };
