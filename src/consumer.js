import 'dotenv/config';
import amqp from 'amqplib';
import AppsService from './AppsService.js';
import MailSender from './MailSender.js';
import Listener from './Listener.js';

const init = async () => {
 const appsService = new AppsService();
 const mailSender = new MailSender();
 const listener = new Listener(appsService, mailSender);
 const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
 const channel = await connection.createChannel();
 await channel.assertQueue('application:notify', {
    durable: true,
  });
 channel.consume('application:notify', (message) => {
  listener.listen(message);
}, { noAck: true });
};

init();