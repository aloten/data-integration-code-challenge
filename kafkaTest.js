const { Kafka } = require('kafkajs');

(async () => {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
  });

  const producer = kafka.producer();

  await producer.connect();

  setInterval(() => {
    producer.send({
      topic: 'pet',
      messages: [{ value: 'Hello KafkaJS user!' }],
    });
  }, 3000);

  const consumer = kafka.consumer({ groupId: 'test-group' })

  await consumer.connect();
  await consumer.subscribe({ topic: 'pet', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
})();
