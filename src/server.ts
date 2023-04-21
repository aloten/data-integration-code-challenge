import path from 'path';
import morgan from 'morgan';
import cors from 'cors';

import { Consumer } from './consumer/Consumer';
import { Producer } from './producer/Producer';
import { Topic } from './types';
import { Kafka } from 'kafkajs';
import express from 'express';
import { DbUtility } from './data/DbUtility';
import petRoutes from './routes/petRoutes';
import productRoutes from './routes/productRoutes';
import prescriptionRoutes from './routes/prescriptionRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// HTTP request logger
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const dbUtility = new DbUtility();

app.use('/pets', petRoutes);
app.use('/products', productRoutes);
app.use('/prescriptions', prescriptionRoutes);

app.listen(3001, () => {
  console.log('\n\nexpress server listening on port 3001...\n\n');
});

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

(async () => {
  const consumer: Consumer = new Consumer(kafka);
  const producer: Producer = new Producer(kafka);

  await consumer.connect(Topic.PET);
  await consumer.run();
  await producer.connect();
  await producer.send(Topic.PET, { value: 'new Pet: Po' });
})();

export { dbUtility };
