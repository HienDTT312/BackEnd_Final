const { consumerConnection } = require('../boostraps/rabbitMQConnection');
const { getMessage, acknowledgeMessage, initializeConsumer } = require('../services/messageTransporterService');


module.exports = () => {
    let service1Channel;
    const service1Queue = 'service1.queue';
    
    const service1Message = async (messageData) => {
        const { message } = getMessage(messageData, service1Queue, service1Channel);

        acknowledgeMessage(messageData, service1Channel);
        console.log('Test');
        try {
            console.log('Get hehee', message);
        } catch (e) {
            console.log(e);
        }
    }

    service1CreatedChannel = initializeConsumer(
        service1Queue, service1Message, consumerConnection,
    )
}