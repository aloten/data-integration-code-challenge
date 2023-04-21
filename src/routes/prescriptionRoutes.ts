import { Pet } from '../data/models/pet/Pet';
import { Prescription } from '../data/models/prescription/Prescription';
import { Product } from '../data/models/product/Product';
import { dbUtility } from '../server';
import express from 'express';
import { producer } from '../server';
import { Topic } from '../types';
const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.id) {
    console.log(`get prescription by id: ${req.query.id}`);
    const prescription: Prescription | null = dbUtility.getPrescription(
      parseInt(req.query.id as string)
    );
    if (prescription) {
      res.json(prescription);
    } else {
      res.status(404).send('prescription not found');
    }
  } else {
    console.log('get all prescriptions');
    const prescriptions: Prescription[] = dbUtility.getAllPrescriptions();
    res.json(prescriptions);
  }
});

// POST a new prescription
router.post('/', (req, res) => {
  console.log(req.body);
  try {
    const productId = req.body.productId;
    const petId = req.body.petId;
    producer.send(Topic.PRESCRIPTION,JSON.stringify({productId, petId})); 
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

export default router;
