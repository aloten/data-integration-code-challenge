import { Message, Topic } from '../types';

export class Producer {
  private producer;

  constructor(kafka: any) {
    this.producer = kafka.producer();
  }
  async connect() {
    await this.producer.connect();
  }

  async send(topic: Topic, message: {}) {
    await this.producer.send({
      topic: topic,
      messages: [{ value: message }],
    });
  }
  async disconnect() {
    await this.producer.disconnect();
  }
}
