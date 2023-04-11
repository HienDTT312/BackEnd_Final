const { consumerConnection } = require('../boostraps/rabbitMQConnection');
const { getMessage, acknowledgeMessage, initializeConsumer } = require('../services/messageTransporterService');


module.exports = () => {
    let projectChannel;
    const projectQueue = 'project.queue';

    const projectMessage = async (messageData) => {
        const { message } = getMessage(messageData, projectQueue, projectChannel);

        acknowledgeMessage(messageData, projectChannel);
        console.log('Test');
        try {
            console.log('Get hehee', message);
        } catch (e) {
            console.log(e);
        }
    }

    projectCreatedChannel = initializeConsumer(
        projectQueue, projectMessage, consumerConnection,
    )
}
