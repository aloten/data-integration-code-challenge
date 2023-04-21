import { admin } from './server';
import { Topic } from './types';
import { Producer } from './producer/Producer';
import { Consumer } from './consumer/Consumer';

export async function setupConsumerAndProducer(
  consumer: Consumer,
  producer: Producer
) {
  await consumer.connect();
  await consumer.subscribe(Topic.PET);
  await consumer.subscribe(Topic.PRODUCT);
  await consumer.subscribe(Topic.PRESCRIPTION);

  await consumer.run();
  await producer.connect();
}

export async function createTopic(topic: Topic) {
  await admin.connect();

  console.log('topics: ' + (await admin.listTopics()));
  try {
    const topicExists = await admin
      .listTopics()
      .then((topics) => topics.includes(topic));
    if (topicExists) {
      console.log(`Topic "${topic}" already exists`);
    } else {
      await admin.createTopics({
        topics: [
          {
            topic: topic,
            numPartitions: 1,
            replicationFactor: 1,
          },
        ],
      });
    }
    console.log(`Topic "${topic}" created successfully`);
  } catch (error) {
    console.log('No topics created for admin.listTopics() to access');
  }

  await admin.disconnect();
}
