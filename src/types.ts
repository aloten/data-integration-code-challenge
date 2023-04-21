export enum Topic {
  PET = 'pet',
}

export enum Species {
  DOG = "dog",
  CAT = "cat",
  HORSE = "horse",
}

export interface Message {
  value: string;
}

export interface KafkaMessage {
  topic: string;
  partition: number;
  message: {
    value: Buffer;
    headers?: Record<string, string>;
  };
}
