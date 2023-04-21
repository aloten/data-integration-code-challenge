import { Topic } from '../types';
import { KafkaMessage } from '../types';

export class Consumer {
  private consumer: any;

  constructor(kafka: any) {
    this.consumer = kafka.consumer({ groupId: 'test-group' });
  }

  async connect(topic: Topic) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: topic, fromBeginning: true });
  }

  async run() {
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }: KafkaMessage) => {
        console.log({
          topic,
          partition,
          value: message.value.toString(),
        });
      },
    });
  }
}
