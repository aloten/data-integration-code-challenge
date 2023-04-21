import { Pet } from '../data/models/pet/Pet';
import { Prescription } from '../data/models/prescription/Prescription';
import { Product } from '../data/models/product/Product';
import { dbUtility } from '../server';
import { Species, Topic } from '../types';
import { KafkaMessage } from '../types';

export class Consumer {
  private consumer: any;

  constructor(kafka: any) {
    this.consumer = kafka.consumer({ groupId: 'group1' });
  }

  async connect() {
    await this.consumer.connect();
  }

  async subscribe(topic: Topic) {
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
        // const json = JSON.parse(message.value.toString());
        // if (topic === Topic.PET) this.consumePetTopic(json);
        // if (topic === Topic.PRODUCT) this.consumeProductTopic(json);
        // if (topic === Topic.PRESCRIPTION) this.consumePrescriptionTopic(json);
      },
    });
  }

  consumePetTopic(message: { name: string; species: string }) {
    dbUtility.createPet(new Pet(message.name, message.species as Species));
  }

  consumeProductTopic(message: { name: string }) {
    dbUtility.createProduct(new Product(message.name));
  }

  consumePrescriptionTopic(message: { petId: string; productId: string }) {
    const productId = parseInt(message.productId);
    const petId = parseInt(message.petId);
    const pet: Pet | null = dbUtility.getPet(petId);
    const product: Product | null = dbUtility.getProduct(productId);
    if (!pet || !product) {
      throw new Error(
        'product or pet is null when trying to create a prescription'
      );
    }
    dbUtility.createPrescription(new Prescription(pet, product));
  }
}
